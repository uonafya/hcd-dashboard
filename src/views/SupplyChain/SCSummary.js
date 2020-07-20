import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { filterUrlConstructor, justFetch } from '../../common/utils';
import { programs } from 'hcd-config';
import Toolbar from 'components/Toolbar/Toolbar';
import Line from './components/Line';

const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const paige = activProg.pages.filter(ep => ep.name == 'Indicator Summary')[0];
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

const SCSummary = props => {
  const classes = useStyles();

  let filter_params = queryString.parse(props.location.hash);
  if (
    filter_params.pe == undefined ||
    filter_params.pe == '~' ||
    (filter_params.pe.search(';') <= 0 && periodFilterType == 'range')
  ) {
    filter_params.pe = 'LAST_6_MONTHS';
  }
  const base_rr_url = endpoints.find(ep => ep.id == 'county__indicator_summary')
    .local_url;
  let [url, setUrl] = useState(
    filterUrlConstructor(
      'LAST_6_MONTHS',
      filter_params.ou,
      filter_params.level,
      base_rr_url
    )
  );
  const [scsumdata, setSCsumdata] = useState([[]]);
  const [period_s, setPeriods] = useState([[]]);
  const [prd, setPrd] = useState(null);
  const [oun, setOun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  const [err, setErr] = useState({ error: false, msg: '' });
  let title = `Supply Chain Performance`;

  const updateSCsumdata = (rws, priod, ogu, levl) => {
	  let mdt = [
		  [100, 300, 400, 500, 400, 390],
		  [100, 900, 12, 500, 100, 390],
		  [100, 300, 400, 100, 200, 190],
		  [100, 30, 400, 500, 400, 390],
		  [100, 800, 460, 570, 480, 410],
		  [100, 30, 140, 150, 640, 900]
	  ]
	  let dta = [
		  {name: "Understocked", data: mdt, color: "#ffc7ce"},
		  {name: "Stock OK", data: mdt, color: "#7bd48d"},
		  {name: "Overstocked", data: mdt, color: "#ffeb9c"},
		  {name: "Out of stock", data: mdt, color: "#ff0000"}
	  ]
    setSCsumdata(dta);
    setPeriods(priod);
    // setOun(ogu)
    // setOulvl(levl)
  };

  let fetchSCsum = async rr_url => {
    setLoading(true);
    try {
      //rr
      //   fetch(rr_url, { signal: abortRequests.signal })
      justFetch(rr_url, { signal: abortRequests.signal })
        // .then(ad => ad.json())
        .then(reply => {
          if (reply.fetchedData.error) {
            setErr({
              error: true,
              msg: reply.fetchedData.message,
              ...reply.fetchedData
            });
          } else {
            let finalSCdata,
              finalSCmonths = [];

            /////////////////////// SC ///////////////////////////
            /////////////////////// SC ///////////////////////////

            let o_gu = reply.fetchedData.metaData.dimensions.ou[0];
            if (filter_params.ou && filter_params.ou != '~') {
              o_gu = filter_params.ou;
            } else {
              o_gu = reply.fetchedData.metaData.dimensions.ou[0];
            }

            updateSCsumdata(finalSCdata, finalSCmonths, o_gu, null);
            setLoading(false);
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
      fetchSCsum(new_url);
    });
  };

  useEffect(() => {
    fetchSCsum(url);
    onUrlChange(base_rr_url);

    return () => {
      console.log(`SC:Summary aborting requests...`);
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
            //   Periods={period_s}
              Periods={["Jan 2020", "Feb 2020", "Mar 2020", "Apr 2020", "May 2020", "Jun 2020"]}
              scData={scsumdata}
            />
          </Grid>
        )}
      </div>
    </div>
  );
};

export default SCSummary;
