import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
  filterUrlConstructor,
  justFetch
} from '../../common/utils';
import { programs } from 'hcd-config';
import Toolbar from 'components/Toolbar/Toolbar';
import Table from 'components/Table/Table';

const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const paige = activProg.pages.filter(ep => ep.page == 'Data Quality: Comparison')[0];
const periodFilterType = paige.periodFilter;
const endpoints = paige.endpoints;

const abortRequests = new AbortController();

const queryString = require('query-string');
const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing(3) },
  content: { marginTop: theme.spacing(1) },
  gridchild: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const DQComparison = props => {
  const classes = useStyles();

  let filter_params = queryString.parse(props.location.hash);
  if (
    filter_params.pe &&
	filter_params.pe.search(';') > 0 
	// && periodFilterType != 'range'
  ) {
    filter_params.pe = 'LAST_MONTH';
  }
  let [url, setUrl] = useState(
    filterUrlConstructor(
      filter_params.pe,
      filter_params.ou,
	//   filter_params.level,
	"5",
      endpoints[0].local_url
    )
  );
  const [hfunderdata, setHFUnderdata] = useState([['Loading...']]);
  const [prd, setPrd] = useState(null);
  const [oun, setOun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  const [err, setErr] = useState({ error: false, msg: '' });
  let title = `DQComparison Facilities`;

  const updateData = (rws, priod, ogu, levl) => {
    setHFUnderdata(rws);
    // setPrd(priod)
    // setOun(ogu)
	// setOulvl(levl)
  };

  
//////// CUSTOM FXNs \\\\\\\\\\\\\\\\\\\\\\\\
const filterItems = (array,query) => {
    return array.filter(function(el) {
        return el.indexOf(query) > -1;
    })
}
const sumArr = arr => arr.reduce((a, b) => a + b, 0);
//////// CUSTOM FXNs \\\\\\\\\\\\\\\\\\\\\\\\


  let fetchHFUnder = async the_url => {
	setLoading(true);
	setErr({ error: false, msg: '' });
    setHFUnderdata([['Loading...']]);
    try {
    //   fetch(the_url, { signal: abortRequests.signal })
      justFetch(the_url, { signal: abortRequests.signal })
        // .then(s_p => s_p.json())
        .then(reply => {
			setLoading(false)
		  if (reply.fetchedData.error) {
            setErr({
              error: true,
              msg: reply.fetchedData.message,
              ...reply.fetchedData
            });
          } else {
            setErr({ error: false, msg: '' });
			/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			/// ~~~~~~~~~~~~~~~~~~~~~~ <SUCCESS ~~~~~~~~~~~~~~~~~~~~~~~~~~
			/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			let tableData = []
			let o_gu = oun
                                   
			reply.fetchedData.metaData.dimensions.ou.map( o_ou => {
				let dxcalvals = [];
				reply.fetchedData.metaData.dimensions.dx.map( o_dx => {
					reply.fetchedData.rows.map( o_row => {
						let dxid = o_row[0];
						let orgunit = o_row[2];
						let dxval = o_row[3];									
						if(orgunit==o_ou) {
							if(o_dx==dxid) {		
								dxcalvals.push(dxval);
							}
						}      
					})
				})

										
				if(dxcalvals[0] != undefined) {
					let diffcal = dxcalvals[0]-dxcalvals[1];
					let percentdiff = ((diffcal)/dxcalvals[1])*100;
					
					let trow = [];
					trow.push( reply.fetchedData.metaData.items[o_ou].name )
					trow.push( o_ou )
					trow.push( reply.fetchedData.metaData.dimensions.pe )
					trow.push( dxcalvals[0] )
					trow.push( dxcalvals[1] )
					trow.push( Math.trunc(diffcal) )
					trow.push( Math.trunc(percentdiff).toFixed(1) )
					
					tableData.push(trow);
				}							
			})

			updateData( tableData, reply.fetchedData.metaData.items[ reply.fetchedData.metaData.dimensions.pe[0] ].name || prd, o_gu, oulvl );
			/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			/// ~~~~~~~~~~~~~~~~~~~~~~ SUCCESS/> ~~~~~~~~~~~~~~~~~~~~~~~~~~
			/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setErr({ error: true, msg: 'Error fetching data: '+err.message });
        });
    } catch (er) {
      setErr({ error: true, msg: 'Error fetching data', ...er });
    }
  };

  const onUrlChange = base_url => {
    props.history.listen((location, action) => {
      let new_filter_params = queryString.parse(location.hash);
      if (
        new_filter_params.pe != '~' &&
        new_filter_params.pe != '' &&
        new_filter_params.pe != null
      ) {
        setPrd(new_filter_params.pe);
      }
      if (
        new_filter_params.ou != '~' &&
        new_filter_params.ou != '' &&
        new_filter_params.ou != null
      ) {
        setOun(new_filter_params.ou);
      }
      if (
        new_filter_params.level != '~' &&
        new_filter_params.level != '' &&
        new_filter_params.level != null
      ) {
        setOulvl(new_filter_params.level);
      }
      let new_url = filterUrlConstructor(
        new_filter_params.pe,
		new_filter_params.ou,
		"5",
        // new_filter_params.level,
        base_url
      );
      fetchHFUnder(new_url);
    });
  };

  useEffect(() => {
    fetchHFUnder(url);
    onUrlChange(endpoints[0].local_url);

    return () => {
      console.log(`HFF:Under: aborting requests...`);
      abortRequests.abort();
    };
  }, []);

  let data = {};
	data.theads = [ 
		'Facility',
		'Code',
		'Reporting period',
		'# Tabs dispensed (A)',
		'# Tabs expected based on weight band (B)',
		'Variance (A - B)',
		'% Variance ( (A-B)/B )'
	];
  data.rows = hfunderdata;

  return (
    <div className={classes.root}>
      <Toolbar
        className={classes.gridchild}
        title={title}
        pe={prd}
        ou={oun}
        lvl={oulvl}
        filter_params={filter_params}
      />
      <div className={classes.content}>
        {err.error ? (
          <Alert severity="error">{err.msg}</Alert>
        ) : (
          <Table
            pageTitle={title}
            theads={data.theads}
            rows={data.rows}
            loading={loading.toString()}
		  />
        )}
      </div>
    </div>
  );
};

export default DQComparison;
