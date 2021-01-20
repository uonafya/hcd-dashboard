import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { filterUrlConstructor, justFetch } from '../../common/utils';
import { programs } from 'hcd-config';
import Toolbar from 'components/Toolbar/Toolbar';
import Line from './components/Line';
import Bar from './components/Bar';
const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const paige = activProg.pages.filter(ep => ep.page == 'Reporting Rate')[0];
const endpoints = paige.endpoints;
const periodFilterType = paige.periodFilter;

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

const RRSummary = props => {
  const classes = useStyles();

  let filter_params = queryString.parse(props.location.hash);
  if (
    filter_params.pe == undefined ||
    filter_params.pe == '~' ||
    (filter_params.pe.search(';') <= 0 && periodFilterType == 'range')
  ) {
    filter_params.pe = 'LAST_6_MONTHS';
  }
  const base_rr_url = endpoints.find(
    ep => ep.id == 'county__reporting_rate_trend'
  )[process.env.REACT_APP_ENV == "dev" ? "local_url": "url"];
  let [url, setUrl] = useState(
    filterUrlConstructor(
      'LAST_6_MONTHS',
      filter_params.ou,
      filter_params.level,
      base_rr_url
    )
  );
  const base_scrr_url = endpoints.find(
    ep => ep.id == 'county__latest_reporting_rate_subcounty'
  )[process.env.REACT_APP_ENV == "dev" ? "local_url": "url"];
  let [scurl, setScUrl] = useState(
    filterUrlConstructor('LAST_MONTH', filter_params.ou, 3, base_rr_url)
  );
  const [rrdata, setRRData] = useState([[]]);
  const [otrrdata, setOTRRData] = useState([[]]);
  const [period_s, setPeriods] = useState([[]]);
  const [latestScRR, setLatestScRR] = useState([[]]);
  const [ScRRpe, setScRRpe] = useState('');
  const [scrrSubcounties, setScRRsubcs] = useState([[]]);
  const [prd, setPrd] = useState(filter_params.pe || null);
  const [oun, setOun] = useState(filter_params.ou || null);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  const [err, setErr] = useState({ error: false, msg: '' });
  let title = `Reporting Rate: Summary`;

  const updateRRData = (rws, priod, ogu, levl) => {
    setRRData(rws);
    setPeriods(priod);
    // setOun(ogu)
    // setOulvl(levl)
  };

  const updateOTRRData = (rws, priod, ogu, levl) => {
    setOTRRData(rws);
  };

  const updateLatestSCRR = (rws, priod, ogu, levl) => {
    setLatestScRR(rws);
    setScRRpe(priod);
    setScRRsubcs(ogu);
  };

  let fetchRR = async rr_url => {
    setLoading(true);
    try {
      //rr
    //   fetch(rr_url, { signal: abortRequests.signal })
      justFetch(rr_url, { signal: abortRequests.signal })
        // .then(ad => ad.json())
        .then(reply => {
          if (reply.fetchedData == undefined || reply.fetchedData?.error) {
            setErr({
              error: true,
              msg: reply.fetchedData.message,
              ...reply.fetchedData
            });
          } else {
            let rows = reply.fetchedData.rows;
            //rr
            let rr_rows = rows.filter(
              o_dx_rw =>
                o_dx_rw[0] == reply.fetchedData.metaData.dimensions.dx[0]
            );
            //ot_rr
            let ot_rr_rows = rows.filter(
              o_dx_rw =>
                o_dx_rw[0] == reply.fetchedData.metaData.dimensions.dx[1]
            );
            let theorigdate = [];
            let minid8 = [];
            let matched_data = [];

            //////////////  rr ////////////////
            rr_rows.map(ydate => {
              let date8 = ydate[1];
              let data8 = ydate[3];
              theorigdate.push(date8);
              let ydata = parseFloat(data8).toFixed(2);
              matched_data.push(ydata);
              minid8.push(date8);
            });
            let xc = 0;
            let finalRRdata = [];
            let finalRRmonths = [];
            let ot_data = [];
            let rr_data = [];
            reply.fetchedData.metaData.dimensions.pe.map(o_rr_pe => {
              rr_rows.map(rw => {
                let array1 = rw;
                if (array1[1] === o_rr_pe) {
                  let findata = parseFloat(array1[3]);
                  let lenudate = array1[1];
                  finalRRdata.push(findata);
                  xc = 0;
                } else xc = 1;
              });
              if (xc === 1) {
                // finalRRdata.push(0.0);
                xc = 0;
              }
            });
            reply.fetchedData.metaData.dimensions.pe.map(p_e => {
              finalRRmonths.push(reply.fetchedData.metaData.items[p_e].name);
            });
            //////////////  rr ////////////////

            ////////////// ontime ////////////////
            let theorigdate2 = [];
            let converted_date_arr2 = [];
            let matched_data2 = [];
            let ondatarr = [];
            ot_rr_rows.map(function(ydate2) {
              let date82 = ydate2[1];
              let data82 = ydate2[2];
              let ondt = parseFloat(ydate2[3]);
              ondatarr.push(ondt);
              theorigdate2.push(date82);
              let ydata2 = parseFloat(data82).toFixed(2);
              matched_data2.push(ydata2);
              //UID Fix
              let nudate2 = date82;
              //End UID Fix
              converted_date_arr2.push(nudate2);
            });

            let xc1 = 0;
            let finalondata2 = [];
            reply.fetchedData.metaData.dimensions.pe.map(o_on_pe => {
              ot_rr_rows.map(rw => {
                let array12 = rw;
                if (array12[1] === o_on_pe) {
                  let findata2 = parseFloat(array12[3]);
                  finalondata2.push(findata2);
                  xc1 = 0;
                } else xc1 = 1;
              });
              if (xc1 === 1) {
                // finalondata2.push(0.0);
                xc1 = 0;
              }
            });
            //////////////end  ontime ////////////////

            let o_gu = reply.fetchedData.metaData.dimensions.ou[0];
            if (filter_params.ou && filter_params.ou != '~') {
              o_gu = filter_params.ou;
            } else {
              o_gu = reply.fetchedData.metaData.dimensions.ou[0];
            }

            updateRRData(finalRRdata, finalRRmonths, o_gu, null);
            updateOTRRData(finalondata2, finalRRmonths, o_gu, null);
            setLoading(false);
          }
        })
        .catch(err => {
			if(abortRequests.signal.aborted){ //if(err.name !== "AbortError"){
				setLoading(false);
				setErr({ error: true, msg: `Error fetching data: ' ${process .env.REACT_APP_ENV == "dev" ? err.message : ""}` });
			}else{
				console.log("Cancelling fetchRR requests");
			}
        });
    } catch (er) {
      setErr({ error: true, msg: 'Error fetching data' });
    }
  };

  let fetchScRR = async scrr_url => {
    setLoading(true);
    try {
      //rr
    //   fetch(scrr_url, { signal: abortRequests.signal })
      justFetch(scrr_url, { signal: abortRequests.signal })
        // .then(ad => ad.json())
        .then(reply => {
          if (reply.fetchedData == undefined || reply.fetchedData?.error) {
            setErr({
              error: true,
              msg: reply.fetchedData.message,
              ...reply.fetchedData
            });
          } else {
            ///////////////////////////////////////////////////////////
            let subcounties = [];
            let scrate = [];
            let scpe =
              reply.fetchedData.metaData.items[
                reply.fetchedData.metaData.dimensions.pe[0]
              ].name;
            reply.fetchedData.metaData.dimensions.ou.map(o_u => {
              subcounties.push(reply.fetchedData.metaData.items[o_u].name);
              scrate.push(
                parseFloat(reply.fetchedData.rows.filter(r_w => r_w[2])[0][3])
              );
            });
            ///////////////////////////////////////////////////////////

            updateLatestSCRR(scrate, scpe, subcounties, null);
            setLoading(false);
          }
        })
        .catch(err => {
			if(abortRequests.signal.aborted){ //if(err.name !== "AbortError"){
				setLoading(false);
				setErr({ error: true, msg: `Error fetching data: ' ${process .env.REACT_APP_ENV == "dev" ? err.message : ""}` });
			}else{
				console.log("Cancelling fetchScRR requests");
			}
        });
    } catch (er) {
      setErr({ error: true, msg: 'Error fetching data' });
    }
  };

  const onUrlChange = (base_url, base_sc_url) => {
    props.history.listen((location, action) => {
		if(location.pathname == paige.route){
			let new_filter_params = queryString.parse(location.hash);
			if (
				new_filter_params.pe != '~' &&
				new_filter_params.pe != '' &&
				new_filter_params.pe != null
			) {
				setPrd(new_filter_params.pe);
			}
			if (new_filter_params.pe && new_filter_params.pe.search(';') <= 0) {
				new_filter_params.pe = 'LAST_6_MONTHS';
				setPrd('LAST_6_MONTHS');
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
			let new_scurl = filterUrlConstructor(
				'LAST_MONTH',
				new_filter_params.ou,
				3,
				base_sc_url
			);
			fetchRR(new_url);
			fetchScRR(new_scurl);
		}
    });
  };

  useEffect(() => {
    fetchRR(url);
    fetchScRR(scurl);
    onUrlChange(base_rr_url, base_scrr_url);

    return () => {
      console.log(`RR:Summary aborting requests...`);
      abortRequests.abort();
    };
  }, []);

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
          <Grid container direction="row" spacing={2}>
            <Line
              Periods={period_s}
              ontimeData={otrrdata}
              rrData={rrdata}
              OTname={'On-time reporting rate'}
              rrname={'Reporting rate'}
            />
            {oun == null || oun == '~' || oun == "HfVjCurKxh2" ? <></> : (
				<Bar
					scrr_subcounties={scrrSubcounties}
					scrr_rate={latestScRR}
					scrr_pe={ScRRpe}
				/>
			)}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default RRSummary;
