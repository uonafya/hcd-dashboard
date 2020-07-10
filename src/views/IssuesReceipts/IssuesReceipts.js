import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
  filterUrlConstructor,
  getValidOUs,
  justFetch
} from '../../common/utils';
import { programs } from 'hcd-config';
import Toolbar from 'components/Toolbar/Toolbar';
import IRTable from './components/Table/IRTable';
import { isArray } from 'validate.js';

const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const paige = activProg.pages.filter(ep => ep.page == 'Issues vs Receipts')[0];
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

const IssuesReceipts = props => {
  const classes = useStyles();

  let filter_params = queryString.parse(props.location.hash);
  if (
    filter_params.pe &&
	filter_params.pe.search(';') > 0 
	// && periodFilterType != 'range'
  ) {
    filter_params.pe = 'LAST_3_MONTHS';
  }
  let [url, setUrl] = useState(
    filterUrlConstructor(
      filter_params.pe,
      filter_params.ou,
      filter_params.level,
      endpoints[0].local_url
    )
  );
  const [irdata, setAccData] = useState([['Loading...']]);
  const [prd, setPrd] = useState(null);
  const [validOUs, setValidOUs] = useState(
    JSON.parse(localStorage.getItem('validOUs'))
  );
  const [oun, setOun] = useState(null);
  const [mnths, setMnths] = useState([])
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  const [err, setErr] = useState({ error: false, msg: '' });
  let title = `Issues vs. Receipts`;

  const updateData = (rws, priod, ogu, levl, peri) => {
    setAccData(rws);
    // setPrd(priod)
    // setOun(ogu)
	// setOulvl(levl)
	setMnths( peri )
  };

  
//////// CUSTOM FXNs \\\\\\\\\\\\\\\\\\\\\\\\
const getVal = (arry,commo, peri) => {
    let valu = filterItems(arry,commo);
    valu = filterItems(valu,peri);
	let thevalue
    if(valu[0] != undefined){
        thevalue = valu[0][2];
    }
    return thevalue;
}
const filterItems = (array,query) => {
    return array.filter(function(el) {
        return el.indexOf(query) > -1;
    })
}
const sumArr = arr => arr.reduce((a, b) => a + b, 0);
//////// CUSTOM FXNs \\\\\\\\\\\\\\\\\\\\\\\\


  let fetchIR = async the_url => {
	setLoading(true);
	setErr({ error: false, msg: '' });
    setAccData([['Loading...']]);
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
			let tableData = [];
			let orgunits = reply.fetchedData.metaData.dimensions.ou;
			let thedxissued = reply.fetchedData.metaData.dimensions.dx.splice(0,reply.fetchedData.metaData.dimensions.dx.length/2);
			let thedxreceived = reply.fetchedData.metaData.dimensions.dx.splice(0,reply.fetchedData.metaData.dimensions.dx.length);
			

			let list_products = ["Artemether-Lumefantrine 20/120 Tabs 6s", "Artemether-Lumefantrine 20/120 Tabs 12s", "Artemether-Lumefantrine 20/120 Tabs 18s", "Artemether-Lumefantrine 20/120 Tabs 24s", "Artesunate Injection", "Sulphadoxine Pyrimethamine Tabs", "Rapid Diagnostic Tests"];
			let procounter = 0;
			let o_gu = reply.fetchedData.metaData.items[reply.fetchedData.metaData.dimensions.ou[0]].name
			let peri = []
			reply.fetchedData.metaData.dimensions.pe.map(p_e=>{
				peri.push( reply.fetchedData.metaData.items[ p_e ].name )
			})
			thedxissued.map( (issdId, index) => {
				let recvdId = thedxreceived[index];

				let iss_arr = reply.fetchedData.rows.filter(ri=>ri[0]==issdId && ri[1]==reply.fetchedData.metaData.dimensions.pe[0])
				let iss_val = 0
				if(isArray(iss_arr) && iss_arr.length > 0){
					iss_val = parseFloat(iss_arr[0][3])
				}

				let recc = []
				reply.fetchedData.metaData.dimensions.pe.map(p_e=>{
					let recvd_arr_month = reply.fetchedData.rows.filter(ri=>ri[0]==recvdId && ri[1]==p_e)
					let recvd_val_month = 0
					if(isArray(recvd_arr_month) && recvd_arr_month.length > 0){
						recvd_val_month = parseFloat(recvd_arr_month[0][3])
					}
					recc.push(recvd_val_month)
				})

				let total_recvd = sumArr(recc);
				
				if(issdId == 'EtG9ozt2joA.DTnItSklSr8') { iss_val *= 1000; }

				let diff_val = parseFloat(total_recvd)-parseFloat(iss_val);
				if(iss_val>total_recvd){}else{} 
				
				let diff_perc = (diff_val/iss_val)*100;
				if(diff_perc<0){
				}
				
				let bcolor = '';
				if(diff_perc>15 && diff_perc<90){ bcolor = 'cell-amber'; }
				
				if(diff_perc<15 && diff_perc>0){ bcolor = 'cell-green'; }
				
				if(diff_perc>=90 || diff_perc<0){ bcolor = 'cell-red'; }

				let calcperc = '';
				
				if(iss_val==0 && diff_val>0) { calcperc = 'Infinity'; } 
				else {
					if(iss_val==0 && diff_val==0) { calcperc = '0%'; }
					else { calcperc = diff_perc.toFixed(1)+'%'; }
				}
				
				let trow = []
				// trow.push( list_products[procounter] )
				trow.push( list_products[index] )
				trow.push( iss_val )
				recc.map(r_ec=>{
					trow.push( r_ec )
				})
				trow.push( total_recvd )
				trow.push( diff_val.toFixed(1) )
				let calc_perc_cell = (
					<>
						{calcperc}
						<span className={"cell-fill "+bcolor} aria-hidden="true" tabIndex="-1"> &nbsp; </span>
					</>
				)
				trow.push( calc_perc_cell )
					
				procounter++;
				tableData.push(trow)
			})
			updateData( tableData, reply.fetchedData.metaData.items[ reply.fetchedData.metaData.dimensions.pe[0] ].name, o_gu, oulvl, peri );
			/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			/// ~~~~~~~~~~~~~~~~~~~~~~ SUCCESS/> ~~~~~~~~~~~~~~~~~~~~~~~~~~
			/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setErr({ error: true, msg: 'Error fetching data', ...err });
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
      fetchIR(new_url);
    });
  };

  useEffect(() => {
    fetchIR(url);
    onUrlChange(endpoints[0].local_url);
    getValidOUs().then(vo => {
      let vFlS = JSON.parse(localStorage.getItem('validOUs'));
      if (vFlS && vFlS.length < 1) {
        setValidOUs(vo);
        // localStorage.removeItem('validOUs')
        // console.log("refetching validOUs with getValidOUs")
        // localStorage.setItem('validOUs', JSON.stringify(vo))
      }
    });

    return () => {
      console.log(`ISSRec: aborting requests...`);
      abortRequests.abort();
    };
  }, []);

  let data = {};
  data.theads = [ 'Commodity' , 'Qty Issued '+mnths[0]];
  mnths.map(mt=>{ 
	  data.theads.push('Qty Received '+mt) 
  })
  data.theads.push('Total')
  data.theads.push('Difference')
  data.theads.push('% Difference')
  data.rows = irdata;

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
          <IRTable
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

export default IssuesReceipts;
