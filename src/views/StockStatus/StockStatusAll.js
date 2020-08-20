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
import Table from 'components/Table/Table';

const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const paige = activProg.pages.filter(ep => ep.page == 'Stock status').pop();
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

const StockStatusOne = props => {
  const classes = useStyles();

  let filter_params = queryString.parse(props.location.hash);
  if (
    filter_params.pe &&
    filter_params.pe.search(';') > 0 &&
    periodFilterType != 'range'
  ) {
    filter_params.pe = 'LAST_MONTH';
  }
  let [url, setUrl] = useState(
    filterUrlConstructor(
      filter_params.pe,
      filter_params.ou,
      filter_params.level,
      endpoints[0][process.env.REACT_APP_ENV == "dev" ? "local_url": "url"]
    )
  );
  const [sdata, setSSData] = useState([['Loading...']]);
  const [prd, setPrd] = useState(null);
  const [validOUs, setValidOUs] = useState(
    JSON.parse(localStorage.getItem('validOUs'))
  );
  const [oun, setOun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  const [err, setErr] = useState({ error: false, msg: '' });
  let title = `Stock Status: All commodities`;

  const updateData = (rws, priod, ogu, levl) => {
    // console.log(`updateData = pe: ${prd}, ou:${oun}, lv:${oulvl}`)
    setSSData(rws);
    // setPrd(priod)
    // setOun(ogu)
    // setOulvl(levl)
  };
  let fetchAll = async the_url => {
    setLoading(true);
    setSSData([['Loading...']]);
    try {
    //   fetch(the_url, { signal: abortRequests.signal })
      justFetch(the_url, { signal: abortRequests.signal })
        // .then(s_p => s_p.json())
        .then(reply => {
          if (reply.fetchedData.error) {
            setErr({
              error: true,
              msg: reply.fetchedData.message,
              ...reply.fetchedData
            });
          } else {
            setErr({ error: false, msg: '' });
            let tableData = [];
            let dxidsadjc = [];
            let dxidshfs = [];
            let count = 0;
            const products = [];

            // let products=["Artemether-Lumefantrine 20/120 Tabs 6s", "Artemether-Lumefantrine 20/120 Tabs 12s",
            // "Artemether-Lumefantrine 20/120 Tabs 18s", "Artemether-Lumefantrine 20/120 Tabs 24s",
            // "Artesunate Injection", "Sulphadoxine Pyrimethamine Tabs", "Rapid Diagnostic Tests"]
            // let dxuom = [
            //   'doses',
            //   'doses',
            //   'doses',
            //   'doses',
            //   'vials',
            //   'tablets',
            //   'tests'
            // ];
            reply.fetchedData.metaData.dimensions.dx.map(dx_val => {
              const nme = reply.fetchedData.metaData.items[dx_val].name;
              if (nme.search(' Adjusted Consumption') > 0) {
                products.push(
                  nme.replace('MCD_', '').replace(' Adjusted Consumption', '').trim()
                );
              }
              if (count <= 6) {
                dxidsadjc.push(dx_val);
              }
              if (count > 6 && count <= 13) {
                dxidshfs.push(dx_val);
              }
              count++;
            });

            let adjcvalues = [];
            let hfsvalues = [];
            let adjcvals = [];
            dxidsadjc.map(row_val => {
              reply.fetchedData.rows.map(row_val2 => {
                if (row_val2[0] == row_val) {
                  if (adjcvals.indexOf(row_val2[0]) >= 0) {
                  } else {
                    adjcvals.push(row_val2[0]);
                  }
                }
              });
            });
            dxidsadjc.map(row_val => {
              if (adjcvals.indexOf(row_val) >= 0) {
                reply.fetchedData.rows.map(row_val2 => {
                  if (row_val == row_val2[0]) {
                    adjcvalues.push(row_val2[3]);
                  }
                });
              } else {
                adjcvalues.push(0);
              }
            });
            let hfidvals = [];
            dxidshfs.map(row_val => {
              reply.fetchedData.rows.map(row_val2 => {
                if (row_val2[0] == row_val) {
                  if (hfidvals.indexOf(row_val2[0]) >= 0) {
                  } else {
                    hfidvals.push(row_val2[0]);
                  }
                }
              });
            });

            dxidshfs.map(row_val => {
              if (hfidvals.indexOf(row_val) >= 0) {
                reply.fetchedData.rows.map(row_val2 => {
                  if (row_val == row_val2[0]) {
                    hfsvalues.push(row_val2[3]);
                  }
                });
              } else {
                hfsvalues.push(0);
              }
            });
            for (let i = 0; i < products.length; i++) {
              if (typeof hfsvalues[i] == 'undefined') {
                hfsvalues[i] = 0;
              }
              if (typeof adjcvalues[i] == 'undefined') {
                adjcvalues[i] = 0;
              }
              let hfsmos = hfsvalues[i] / adjcvalues[i];
              if (isNaN(hfsmos)) {
                hfsmos = 0;
              }
              let trow = [];
              trow.push(products[i]);
            //   trow.push(dxuom[i]);
              trow.push(Math.trunc(adjcvalues[i]).toLocaleString());
              trow.push(Math.trunc(hfsvalues[i]).toLocaleString());
              trow.push(hfsmos.toFixed(1));
              tableData.push(trow);
            }
            let o_gu;
            if (filter_params.ou) {
              o_gu = filter_params.ou;
            } else {
              o_gu = '';
            }
            updateData(
              tableData,
              reply.fetchedData.metaData.items[
                reply.fetchedData.metaData.dimensions.pe[0]
              ].name,
              o_gu,
              oulvl
            );
          }
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setErr({ error: true, msg: 'Error fetching data: ' + process .env.REACT_APP_ENV == "dev" ? err.message : "" });
        });
    } catch (er) {
      setErr({ error: true, msg: 'Error fetching data' + process .env.REACT_APP_ENV == "dev" ? er.message : "" });
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
      fetchAll(new_url);
    });
  };

  useEffect(() => {
    fetchAll(url);
    onUrlChange(endpoints[0][process.env.REACT_APP_ENV == "dev" ? "local_url": "url"]);
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
      console.log(`SS:All aborting requests...`);
      abortRequests.abort();
    };
  }, []);

  let data = {};
  data.theads = [
    'Commodity',
    // 'Unit of measure',
    'Adjusted AMC',
    'Latest SOH',
    'Months of Stock (MOS)'
  ];
  data.rows = sdata;

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

export default StockStatusOne;
