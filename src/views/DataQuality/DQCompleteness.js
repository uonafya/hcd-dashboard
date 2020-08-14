import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import { Grid } from '@material-ui/core';
import Toolbar from 'components/Toolbar/Toolbar';
import { filterUrlConstructor, justFetch, getValidOUs } from 'common/utils';
import DQTable from './components/DQTable/DQTable';
import LineGraph from './components/LineGraph/LineGraph';
import { programs } from 'hcd-config';

const abortRequests = new AbortController();

const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const paige = activProg.pages.filter(ep => ep.name == 'Completeness')[0];
const periodFilterType = paige.periodFilter;
const endpoints = paige.endpoints.filter(ep=>ep.name=='Completeness');

const queryString = require('query-string');
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  sstatus: {
    height: '400px'
  }
}));

const DQCompleteness = props => {
  const classes = useStyles();

  let filter_params = queryString.parse(props.location.hash);
  if (
    filter_params.pe &&
	// filter_params.pe.search(';') < 1 &&
	!filter_params.pe.includes(';') &&
	!filter_params.pe.includes('LAST')
  ) {
    filter_params.pe = 'LAST_6_MONTHS';
  }
  const [summaryData, setSummary] = useState([]);
  const [facilitiesReport, setFacilitiesReport] = useState([['Loading ...']]);
  const [peList, setPeList] = useState([]);
  const [facilitiesNoReport, setFacilitiesNoReport] = useState([['Loading...']]);
  const [prd, setPrd] = useState(filter_params.pe);
  const [oun, setOun] = useState(filter_params.ou);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  const [err, setErr] = useState({ error: false, msg: '' });
  const [u_rl, setUrl] = useState(
    filterUrlConstructor(
      filter_params.pe,
      filter_params.ou,
      filter_params.level,
      endpoints[0].local_url
    )
  );
  const [validOUs, setValidOUs] = useState(
    JSON.parse(localStorage.getItem('validOUs'))
  );
  let title = `Data Quality: Completeness`;

  const updateSummary = (rws, priod, ogu, levl) => {
    setSummary(rws);
    setPrd(priod);
    // setOun(oun)
    // setOulvl(levl)
  };
  const updateFacilitiesReport = (rws) => {
    setFacilitiesReport(rws);
  };
  const updatePeList = (pes) => {
    setPeList(pes);
  };

  const updateFacilitiesNoReport = (rws) => {
    setFacilitiesNoReport(rws);
  };

  let fetchDQCompleteness = async ( u_rl ) => {
    setLoading(true);
    try {
      //   fetch(u_rl, { signal: abortRequests.signal })
      justFetch(u_rl, { signal: abortRequests.signal })
        // .then(ad => ad.json())
        .then(reply => {
          setLoading(false);
          if (reply.fetchedData.error) {
            setErr({
              error: true,
              msg: reply.fetchedData.message,
              ...reply.fetchedData
            });
          } else {
			setErr({ error: false, msg: '' });
			let summaryData = []
			let facReport = []
			let facNoReport = []
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~<SUCCESS~~~~~~~~~~~~~~~~~~
			const total_facilities= reply.fetchedData.metaData.dimensions.ou.length;

			let reported = [];
			let expected = [];
			let pelist = []
			reply.fetchedData.metaData.dimensions.pe.map((period)=>{
				let total = 0;
				let expected_t = 0;
				reply.fetchedData.rows.map((onerow)=>{
					if (period === onerow[1] && onerow[0] === reply.fetchedData.metaData.dimensions.dx[0]){ total = total+ 1; } else
					if (period === onerow[1] && onerow[0] === reply.fetchedData.metaData.dimensions.dx[1]){ expected_t = expected_t + 1; }
				});
				reported.push(total);
				expected.push(expected_t);
				pelist.push( reply.fetchedData.metaData.items[period].name )
			});

			let didNotReport = [];
			reported.map((value,index)=>{
				const facilities = expected[index];
				let empty_reports = facilities - value
				didNotReport.push(empty_reports)
			});
			let wbdataset = [];

			wbdataset.push(pelist);
			wbdataset.push(reported);
			wbdataset.push(didNotReport);
			summaryData = [
				{name: "Facilities with weight band data", data: reported},
				{name: "Facilities without weight band data", data: didNotReport}
			]
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCESS/>~~~~~~~~~~~~~~~~~
			updateSummary(summaryData)


			//////////////////////
			////// DETAIL ////////
			// ~~~~~~~~~~~~~~~~~~~~~~~~REPORTED~~~~~~~~~~~~~~~~~~~~~~~~
			let lastperd = reply.fetchedData.metaData.dimensions.pe[reply.fetchedData.metaData.dimensions.pe.length - 1];
			let rp_fac_codes = [];
			reply.fetchedData.rows.map((row_val)=>{
				if (lastperd === row_val[1]){
					rp_fac_codes.push(row_val[2]);
				}
			});
			rp_fac_codes.map((rpfc_val, ix)=>{
				let reported_trow = []
				reported_trow.push( reply.fetchedData.metaData.items[rpfc_val].name )
				reported_trow.push( rpfc_val )
			});
			updateFacilitiesReport(facReport)
			
			// ~~~~~~~~~~~~~~~~~~~~~~~~NOT~~REPORTED~~~~~~~~~~~~~~~~~~~~~~
			let valid_orgs = validOUs;
			reply.fetchedData.metaData.dimensions.ou.map((valou)=>{
				let the_ou = valou;
				let not_reported_trow = []
				if(true){//valid_orgs.includes(the_ou)){
					if(!rp_fac_codes.includes(the_ou)){
						not_reported_trow.push( reply.fetchedData.metaData.items[the_ou].name )
						not_reported_trow.push( the_ou )
						facNoReport.push( not_reported_trow )
					}
				}
			});
			updateFacilitiesNoReport(facNoReport)
			////// DETAIL ////////
			//////////////////////
			updatePeList(pelist)
          }
        })
        .catch(err => {
          setLoading(false);
          setErr({ error: true, msg: 'Error fetching data', ...err });
        });
    } catch (er) {
      setErr({ error: true, msg: 'Error fetching data' });
    }
  };

  const onUrlChange = () => {
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
        setOulvl(5);//setOulvl(new_filter_params.level);
      }
      let new_url = filterUrlConstructor(
        new_filter_params.pe,
        new_filter_params.ou,
        new_filter_params.level,
        u_rl
      );
      fetchDQCompleteness(
        new_url,
      );
    });
  };

  useEffect(() => {
    fetchDQCompleteness(u_rl);
	onUrlChange();
	getValidOUs().then(vo => {
		let vFlS = JSON.parse(localStorage.getItem('validOUs'));
		if (vFlS && vFlS.length < 1) {
		  setValidOUs(vo);
		}
	});

    return () => {
      console.log(`DQ:Completeness aborting requests...`);
      abortRequests.abort();
    };
  }, []);

  return (
    <div className={classes.root}>
      <Toolbar
        title={title}
        pe={prd}
        ou={oun}
        lvl={null}
        filter_params={filter_params}
      />
      <Grid container spacing={4}>
        {err.error ? (
          <Alert severity="error">{err.msg}</Alert>
        ) : (
          <>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
              justify="center"
              container>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <LineGraph
					data={summaryData}
					period={peList}
                />
              </Grid>
            </Grid>
            <br />
            <Grid item lg={6} md={6} xl={6} xs={12}>
				{/* <h4>Facilities w/ report</h4> */}
              <DQTable
                pageTitle={`Facilities that did NOT report data: ${facilitiesNoReport.length}`}
                theads={[ 'Name', 'Code' ]}
                rows={facilitiesNoReport}
                loading={false}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
				{/* <h4>Facilities No report</h4> */}
              <DQTable
                pageTitle={`Facilities that reported data: ${facilitiesReport.length}`}
                theads={[ 'Name', 'Code' ]}
                rows={facilitiesReport}
                loading={false}
              />
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default DQCompleteness;
