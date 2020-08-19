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
const paige = activProg.pages.filter(ep => ep.name == 'Overstocked Facilities')[0];
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

const Overstocked = props => {
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
      filter_params.level,
      endpoints[0].local_url
    )
  );
  const [hfoverdata, setHFOverdata] = useState([['Loading...']]);
  const [prd, setPrd] = useState(null);
  const [oun, setOun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  const [err, setErr] = useState({ error: false, msg: '' });
  let title = `Overstocked Facilities`;

  const updateData = (rws, priod, ogu, levl) => {
    setHFOverdata(rws);
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


  let fetchHFOver = async the_url => {
	setLoading(true);
	setErr({ error: false, msg: '' });
    setHFOverdata([['Loading...']]);
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

			let orgunits = [];
			reply.fetchedData.rows.map( (rowentry) => {
				if (orgunits.indexOf(rowentry[1]) >= 0) {
				} else {
					orgunits.push(rowentry[2]);
				}
			});

			let orgunitmos = [];
			let orgunitphy = [];
			let orgunitdiff = [];
			let orgunitamc = [];

			reply.fetchedData.metaData.dimensions.ou.map( (o_ou) => {
				if (orgunits.indexOf(o_ou) >= 0) {
					reply.fetchedData.rows.map( (rowkentry) => {
						if (rowkentry[0] == reply.fetchedData.metaData.dimensions.dx[0] && o_ou == rowkentry[2]) {
							orgunitmos[o_ou] = rowkentry[3];
						}
						if (rowkentry[0] == reply.fetchedData.metaData.dimensions.dx[1] && o_ou == rowkentry[2]) {
							orgunitphy[o_ou] = rowkentry[3];
						}
						if (rowkentry[0] == reply.fetchedData.metaData.dimensions.dx[2] && o_ou == rowkentry[2]) {
							orgunitamc[o_ou] = rowkentry[3];
						}
					});
				}
			});

			reply.fetchedData.metaData.dimensions.ou.map( (one_ou) => {
				let trow = []
				if (orgunitmos[one_ou] > 6) {
					let diffmos = (6/parseFloat(orgunitmos[one_ou]))*parseFloat(orgunitphy[one_ou]);
                	orgunitdiff[one_ou] = (parseFloat(orgunitphy[one_ou])-diffmos).toFixed(0);
					trow.push(reply.fetchedData.metaData.items[one_ou].name)
					trow.push(one_ou)
					trow.push(orgunitmos[one_ou])
					trow.push(orgunitamc[one_ou])
					trow.push(orgunitphy[one_ou])
					trow.push(orgunitdiff[one_ou])
					tableData.push(trow)
				}
			});
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
        new_filter_params.level,
        base_url
      );
      fetchHFOver(new_url);
    });
  };

  useEffect(() => {
    fetchHFOver(url);
    onUrlChange(endpoints[0].local_url);
    return () => {
      console.log(`HFF:Over: aborting requests...`);
      abortRequests.abort();
    };
  }, []);

  let data = {};
	data.theads = [ 
		'Name',
		'Code',
		'MOS',
		'AMC',
		'Actual Stock',
		'Overstocked by'
	];
  data.rows = hfoverdata;

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

export default Overstocked;
