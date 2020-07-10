import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import { Grid } from '@material-ui/core';
import Toolbar from 'components/Toolbar/Toolbar';
import { filterUrlConstructor, justFetch } from 'common/utils';
import DQTable from './components/DQTable/DQTable';
import LineGraph from './components/LineGraph/LineGraph';
import { programs } from 'hcd-config';

const abortRequests = new AbortController();

const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const paige = activProg.pages.filter(ep => ep.name == 'Completeness')[0];
const periodFilterType = paige.periodFilter;
const endpoints = paige.endpoints;

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
    filter_params.pe.search(';') > 0 &&
    periodFilterType != 'range'
  ) {
    filter_params.pe = 'LAST_MONTH';
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
			let summaryData, facReport, facNoReport = []
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
			// facReport = reported
			// facNoReport = didNotReport
			summaryData = [
				{name: "Facilities with weight band data", data: reported},
				{name: "Facilities without weight band data", data: didNotReport}
			]
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCESS/>~~~~~~~~~~~~~~~~~
			updateSummary(summaryData)
			// updateFacilitiesReport(facReport)
			// updateFacilitiesNoReport(facNoReport)
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

    return () => {
      console.log(`NatSum aborting requests...`);
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
				<h4>Facilities w/ report</h4>
				<p>{JSON.stringify(facilitiesReport)}</p>
              {/* <DQTable
                pageTitle={`Facilities that reported data`}
                theads={[
                  'Name',
                  'Code'
                ]}
                rows={facilitiesReport}
                loading={false}
              /> */}
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
				<h4>Facilities No report</h4>
				<p>{JSON.stringify(facilitiesNoReport)}</p>
              {/* <DQTable
                pageTitle={`Facilities that did NOT report data`}
                theads={[
                  'Name',
                  'Code'
                ]}
                rows={facilitiesNoReport}
                loading={false}
              /> */}
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default DQCompleteness;
