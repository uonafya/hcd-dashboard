import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import { Grid } from '@material-ui/core';
import Toolbar from 'components/Toolbar/Toolbar';
import { filterUrlConstructor, justFetch } from 'common/utils';
import Table from 'components/Table/Table';
import { MOSbyCommodity } from './components';
import { programs } from 'hcd-config';

const abortRequests = new AbortController();

const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const paige = activProg.pages.filter(ep => ep.page == 'Dashboard')[0];
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

const Dashboard = props => {
  const classes = useStyles();

  let base_mos_com = endpoints.filter(ep => ep.id == 'all__mos_by_commodity')[0]
    [process.env.REACT_APP_ENV == "dev" ? "local_url": "url"];
  let base_stockstatus = endpoints.filter(ep => ep.id == 'all__stock_status')[0]
    [process.env.REACT_APP_ENV == "dev" ? "local_url": "url"];
  let base_facility_ss = endpoints.filter(
    ep => ep.id == 'all__facilities_stock_status'
  )[0][process.env.REACT_APP_ENV == "dev" ? "local_url": "url"];
  let base_expected_reports = activProg.endpoints.filter(
    ae => ae.id == 'all__expected_reports'
  )[0][process.env.REACT_APP_ENV == "dev" ? "local_url": "url"];

  let filter_params = queryString.parse(props.location.hash);

  if (
    filter_params.pe &&
    filter_params.pe.search(';') > 0 &&
    periodFilterType != 'range'
  ) {
    filter_params.pe = 'LAST_MONTH';
  }
  let mos_url = filterUrlConstructor(
    filter_params.pe,
    filter_params.ou,
    filter_params.level,
    base_mos_com
  );
  let ss_url = filterUrlConstructor(
    filter_params.pe,
    filter_params.ou,
    filter_params.level,
    base_stockstatus
  );
  let hfss_url = filterUrlConstructor(
    filter_params.pe,
    filter_params.ou,
    5,
    base_facility_ss
  );
  let hfexp_url = filterUrlConstructor(
    filter_params.pe,
    filter_params.ou,
    null,
    base_expected_reports
  );
  const [mosdata, setMOSData] = useState([[]]);
  const [ssdata, setSSData] = useState([['Loading...']]);
  const [hfssdata, setHFSSData] = useState([['Loading...']]);
  const [prd, setPrd] = useState(filter_params.pe);
  const [oun, setOun] = useState(filter_params.ou);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  const [mosLabels, setMOSlabels] = useState([]);
  let [minmax, setMinMax] = useState([9, 18]);
  let [yminmax, setyMinMax] = useState([0, 24]);
  const [err, setErr] = useState({ error: false, msg: '' });
  let title = `Overview.`;

  const updateMOSData = (rws, priod, ogu, levl, labels) => {
    setMOSData(rws);
    setPrd(priod);
    // setOun(oun)
	// setOulvl(levl)
	setMOSlabels(labels)
  };

  const updateSSData = (rws, priod, ogu, levl) => {
    setSSData(rws);
  };

  const updateHFSSData = (rws, priod, ogu, levl) => {
    setHFSSData(rws);
  };

  /* ========================================================================
  <MOS_by_commo
  ======================================================================== */
  let fetchMOS = async mos_url => {
    setLoading(true);
    setMOSData([[0, 0, 0, 0, 0, 0, 0, 0]]);
    try {
      justFetch(mos_url, { signal: abortRequests.signal })
        // .then(ad => ad.json())
        .then(reply => {
          //check if error here
          let rows_data = [];
          let alnames = [];
          reply.fetchedData.metaData.dimensions.dx.map((o_dx, inx) => {
            alnames.push( reply.fetchedData.metaData.items[o_dx].name.replace('PMI_','').replace('MOS','').trim() );
            const rows = reply.fetchedData.rows;
            if (rows.length > 0) {
              let dx_rows = rows.filter(o_dx_rw => o_dx_rw[0] == o_dx);
              if (dx_rows.length > 0) {
                rows_data.push(parseFloat(dx_rows[0][3]));
              } else {
                rows_data.push(0);
              }
            }
          });

          let o_gu = reply.fetchedData.metaData.dimensions.ou[0];
          if (filter_params.ou && filter_params.ou != '~') {
            o_gu = filter_params.ou;
          } else {
            o_gu = reply.fetchedData.metaData.dimensions.ou[0];
          }
          updateMOSData(
            rows_data,
            reply.fetchedData.metaData.items[
              reply.fetchedData.metaData.dimensions.pe[0]
            ].name,
            o_gu,
			null,
			alnames
          );

          if (o_gu !== 'HfVjCurKxh2' && o_gu !== '~') {
            setMinMax([3, 6]);
            setyMinMax([0, 10]);
          }

          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setErr({ error: true, msg: 'Error fetching data: ' + process .env.REACT_APP_ENV == "dev" ? err.message : "" });
        });
    } catch (er) {
      setLoading(false);
      setErr({ error: true, msg: 'Error fetching data' + process .env.REACT_APP_ENV == "dev" ? er.message : "" });
    }
  };

  /* ========================================================================
   <HF StockStatus
   ======================================================================== */
  const fetchHFSS = async (hfss_url, hf_exp_url) => {
    const totalorgs = 0;
    justFetch(hfss_url, { signal: abortRequests.signal })
    //   .then(ds => ds.json())
      .then(dataz => {
        fetch(hf_exp_url, { signal: abortRequests.signal })
          .then(re => re.json())
          .then(totalorgs => {
            totalorgs = parseInt(totalorgs.fetchedData.rows[0][3]);
            // console.log(`getExpectedUnits(${hf_exp_url}) = ${totalorgs}`)

            const data = dataz.fetchedData;
            let orgunits = data.metaData.dimensions.ou;
            let hfss_rows = [];
            let countname = 0;
            // let rheads = []
            data.metaData.dimensions.dx.map((entry, ky) => {
              // console.log(`(${ky}). fetchHFSS: DX: ${entry}  =  ${data.metaData.items[entry].name}`)
              let overstock = 0;
              let stockok = 0;
              let understock = 0;
              let stockout = 0;
              let hfss_row = [];
              let nme = data.metaData.items[entry].name;
              nme = nme
                .replace('PMI_', '')
                .replace('MCD_', '')
                .replace(' Adjusted Consumption', '')
                .replace(' MOS', '');
              // if(nme.search('Adjusted Consumption') > 0){
              // 	rheads.push( nme )
              // }
              if (ky < 8) {
                // hfss_row.push(data.metaData.items[entry].name);
                //   hfss_row.push(rheads[ky]);
                hfss_row.push(nme);
                data.rows.map(rentry => {
                  let dxid = rentry[0];
                  let mosval = parseFloat(rentry[3]);
                  if (dxid == entry) {
                    if (mosval > 6) {
                      overstock++;
                    }
                    if (mosval >= 3 && mosval <= 6) {
                      stockok++;
                    }
                    if (mosval > 0 && mosval < 3) {
                      understock++;
                    }
                    if (mosval <= 0) {
                      stockout++;
                    }
                  }
                });
                countname++;
                let nomos =
                  totalorgs - (overstock + stockok + understock + stockout);
                let overpercent = (overstock / totalorgs) * 100;
                let okpercent = (stockok / totalorgs) * 100;
                let underpercent = (understock / totalorgs) * 100;
                let stockoutpercent = (stockout / totalorgs) * 100;
                let nomospercent = (nomos / totalorgs) * 100;

                hfss_row.push(`${overstock} (${overpercent.toFixed(0)}%)`);
                hfss_row.push(`${stockok} (${okpercent.toFixed(0)}%)`);
                hfss_row.push(`${understock} (${underpercent.toFixed(0)}%)`);
                hfss_row.push(`${stockout} (${stockoutpercent.toFixed(0)}%)`);
                hfss_row.push(`${nomos} (${nomospercent.toFixed(0)}%)`);
                hfss_row.push(totalorgs);
                hfss_rows.push(hfss_row);
              }
            });

            let o_gu = data.metaData.dimensions.ou[0];
            if (filter_params.ou && filter_params.ou != '~') {
              o_gu = filter_params.ou;
            } else {
              o_gu = data.metaData.dimensions.ou[0];
            }
            updateHFSSData(
              hfss_rows,
              data.metaData.items[data.metaData.dimensions.pe[0]].name,
              o_gu,
              null
            );
          })
          .catch(err => {
            setLoading(false);
            setErr({ error: true, msg: 'Error fetching data: ' + process .env.REACT_APP_ENV == "dev" ? err.message : "" });
          });
      })
      .catch(err => {
        setLoading(false);
        setErr({ error: true, msg: 'Error fetching data: ' + process .env.REACT_APP_ENV == "dev" ? err.message : "" });
      });
  };
  /* ========================================================================
   HF StockStatus />
   ======================================================================== */

  let getValue = (arrayy, searchTerm) => {
    let the_val = 0;
    arrayy.map(function(arrayItem) {
      if (searchTerm == arrayItem[0]) {
        the_val = parseFloat(arrayItem[3]);
      }
    });
    return parseFloat(the_val);
  };

  let fetchSStatus = ss_url => {
    setSSData([['Loading...']]);
    justFetch(ss_url, { signal: abortRequests.signal })
    // fetch(ss_url, { signal: abortRequests.signal })
    //   .then(ad => ad.json())
      .then(reply => {
        const data = reply.fetchedData;
        let ss_rows = [];
        let phycount = '';
        let adjc = '';
        let mos = '';
        let countercon = 0;
        let thedx = data.metaData.dimensions.dx;

        let rheads = [];
        thedx.map(d_x_ => {
          let nme_ = reply.fetchedData.metaData.items[d_x_].name;
          if (nme_.search(' MOS') > 0) {
            rheads.push(
              nme_
                .replace('PMI_', '')
                .replace('MCD_', '')
                .replace(' MOS', '')
            );
          }
        });

        let phy_count_arr = thedx.slice(8, 16);
        let phy_count_arr_vals = [];
        phy_count_arr.map(function(onePhy, inx2) {
          let onePhy_val = getValue(data.rows, onePhy);
          if (
            onePhy_val == undefined ||
            onePhy_val == null ||
            onePhy_val == ''
          ) {
            phy_count_arr_vals.push(0);
          } else {
            phy_count_arr_vals.push(onePhy_val);
          }
        });

        let adj_cons_arr = thedx.slice(16, 24);
        let adj_cons_arr_vals = [];
        adj_cons_arr.map(function(oneAdj, inx) {
          let oneAdj_val = getValue(data.rows, oneAdj);
          if (
            oneAdj_val == undefined ||
            oneAdj_val == null ||
            oneAdj_val == ''
          ) {
            adj_cons_arr_vals.push(0);
          } else {
            adj_cons_arr_vals.push(oneAdj_val);
          }
        });

        let mos_arr = thedx.slice(0, 8);
        let mos_arr_vals = [];
        mos_arr.map(function(oneMOS, inx0) {
          let oneMOS_val = getValue(data.rows, oneMOS);
          if (
            oneMOS_val == undefined ||
            oneMOS_val == null ||
            oneMOS_val == ''
          ) {
            mos_arr_vals.push(0);
          } else {
            mos_arr_vals.push(oneMOS_val);
          }
        });

        adj_cons_arr.map(function(entry, key) {
          const tablerow = [];
          tablerow.push(rheads[countercon]);
          adjc = adj_cons_arr_vals[key];
          phycount = phy_count_arr_vals[key];
          mos = mos_arr_vals[key];
          let bgcolor = '#ffffff';
          let fcolor = '#222222';
          if (mos <= 0) {
            bgcolor = '#ff0000';
            fcolor = '#ffffff';
          }
          if (mos > 0 && mos < 3) {
            bgcolor = '#ffc7ce';
            fcolor = '#222222';
          }
          if (mos >= 3 && mos <= 6) {
            bgcolor = '#7bd48d';
            fcolor = '#222222';
          }
          if (mos > 6) {
            bgcolor = '#ffeb9c';
            fcolor = '#222222';
          }
          tablerow.push(adjc.toFixed(0));
          tablerow.push(phycount.toFixed(0));
          tablerow.push(mos.toFixed(1));
          // tablerow.push(`fcolor:${fcolor}, bgcolor:${bgcolor}, ${mos.toFixed(1)}` );
          ss_rows.push(tablerow);
          countercon++;
        });
        updateSSData(
          ss_rows,
          data.metaData.items[data.metaData.dimensions.pe[0]].name,
          data.metaData.dimensions.ou[0],
          null
        );
      })
      .catch(err => {
        setLoading(false);
        setErr({ error: true, msg: 'Error fetching data: ' + process .env.REACT_APP_ENV == "dev" ? err.message : "" });
      });
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
        setOulvl(new_filter_params.level);
      }
      let new_mos_url = filterUrlConstructor(
        new_filter_params.pe,
        new_filter_params.ou,
        new_filter_params.level,
        base_mos_com
      );
      fetchMOS(new_mos_url);
      let new_ss_url = filterUrlConstructor(
        new_filter_params.pe,
        new_filter_params.ou,
        new_filter_params.level,
        base_stockstatus
      );
      fetchSStatus(new_ss_url);
      let new_hfss_url = filterUrlConstructor(
        new_filter_params.pe,
        new_filter_params.ou,
        new_filter_params.level,
        base_facility_ss
      );
      let new_hfexp_url = filterUrlConstructor(
        new_filter_params.pe,
        new_filter_params.ou,
        '~',
        base_expected_reports
      );
      fetchHFSS(new_hfss_url, new_hfexp_url);
    });
  };

  useEffect(() => {
    fetchMOS(mos_url);
    fetchSStatus(ss_url);
    fetchHFSS(hfss_url, hfexp_url);
    onUrlChange();

    return () => {
      //   console.log(`Dashboard: aborting requests...`);
      //   abortRequests.abort();
    };
  }, []);

  /* ========================================================================
   MOS_by_commo />
   ======================================================================== */

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
          <Alert severity="error">
            <b>{err.msg}</b>
            <br />
            {JSON.stringify(err)}
          </Alert>
        ) : (
          <>
            <Grid item lg={6} md={6} xl={6} xs={12} className={classes.sstatus}>
              <Table
                pageTitle={`Commodities Stock Status`}
                theads={['Commodity', 'adj. AMC', 'Latest SOH', 'MOS']}
                rows={ssdata}
                loading={false}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <MOSbyCommodity
                minmax={minmax}
                yminmax={yminmax}
				data={mosdata}
				labels={mosLabels}
              />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <Table
                pageTitle={`Health Facility Stock Status (%)`}
                theads={[
                  'Commodity',
                  'Overstocked',
                  'Stock OK',
                  'Understocked',
                  'Stocked Out',
                  'No Data',
                  'Total'
                ]}
                rows={hfssdata}
                loading={false}
              />
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default Dashboard;
