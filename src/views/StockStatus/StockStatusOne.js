import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Select, MenuItem, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
  filterUrlConstructor,
  getValidOUs,
  justFetch
} from '../../common/utils';
import { programs } from 'hcd-config';
import Toolbar from 'components/Toolbar/Toolbar';
import Table from 'components/Table/Table';
import MFLcell from 'components/Table/MFLcell';

const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const paige = activProg.pages.filter(ep => ep.page == 'Stock status')[0];
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

  // ------pages-------
  const [spages, setSSPages] = useState([['Loading...']]);
  // ------pages-------
  let filter_params = queryString.parse(props.location.hash);
  if (
    filter_params.pe &&
    filter_params.pe.search(';') > 0 &&
    periodFilterType != 'range'
  ) {
    filter_params.pe = 'LAST_MONTH';
  }
  filter_params.level = 5;
  let [url, setUrl] = useState(
    filterUrlConstructor(
      filter_params.pe,
      filter_params.ou,
      5,
      endpoints[0][process.env.REACT_APP_ENV == "dev" ? "local_url": "url"]
    )
  );
  const [sdata, setSSData] = useState([['Loading...']]);
  const [prd, setPrd] = useState(null);
  const [validOUs, setValidOUs] = useState(
    JSON.parse(localStorage.getItem('validOUs'))
  );
  const [oun, setOun] = useState(null);
  const [hds, setHds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(5);
  const [commodity_url, setCommodity] = useState(endpoints[0][process.env.REACT_APP_ENV == "dev" ? "local_url": "url"]);
  const [err, setErr] = useState({ error: false, msg: '' });
  let title = `Stock Status`;

  const updateData = (rws, priod, ogu, levl) => {
    // console.log(`updateData = pe: ${prd}, ou:${oun}, lv:${oulvl}`)
    setSSData(rws);
    // setPrd(priod)
    // setOun(ogu)
    // setOulvl(levl)
  };

  let fetchAL = async the_url => {
    setLoading(true);
    setSSData([['Loading...']]);
    // console.log(url)
    try {
      //   fetch(the_url, { signal: abortRequests.signal })
      justFetch(the_url, { signal: abortRequests.signal })
        // .then(ad => ad.json())
        .then(reply => {
          if (reply.fetchedData.error) {
            setErr({
              error: true,
              msg: reply.fetchedData.message,
              ...reply.fetchedData
            });
          } else {
            setErr({ error: false, msg: '' });
            //check if error here
            let rows_data = [];
            const rows = reply.fetchedData.rows;
            let all_ous = [];

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
            setHds([]);
            const heds = [];
            reply.fetchedData.metaData.dimensions.dx.map((dxh, indxh) => {
              heds.push(reply.fetchedData.metaData.items[dxh].name);
            });
            setHds(heds);
            // console.log(`heads: ${JSON.stringify(hds)}`);
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
            reply.fetchedData.metaData.dimensions.ou.map((o_ou, ix) => {
              if (rows.length > 0) {
                //   if (validOUs && validOUs.includes(o_ou) && rows.length > 0) {
                let ou_rows = rows.filter(o_r => o_r[2] == o_ou);
                let ro_w = [];
                ro_w.push(reply.fetchedData.metaData.items[o_ou].name);
                ro_w.push(<MFLcell dhis_code={o_ou}/>);
                all_ous.push([
                  reply.fetchedData.metaData.items[o_ou].name,
                  o_ou
                ]);
                reply.fetchedData.metaData.dimensions.dx.map((o_dx, inx) => {
                  let dx_rows = ou_rows.filter(o_dx_rw => o_dx_rw[0] == o_dx);
                  if (dx_rows.length > 0) {
                    let dxval = dx_rows[0][3];
                    let n_cell;
                    if (dxval < 0) {
                      n_cell = (
                        <>
                          {dxval}
                          <span
                            className="cell-fill cell-red"
                            aria-hidden="true"
                            tabIndex="-1">
                            &nbsp;
                          </span>
                        </>
                      );
                    }
                    if (dxval >= 0 && dxval < 3) {
                      n_cell = (
                        <>
                          {dxval}
                          <span
                            className="cell-fill cell-red"
                            aria-hidden="true"
                            tabIndex="-1">
                            &nbsp;
                          </span>
                        </>
                      );
                    }
                    if (dxval >= 3 && dxval <= 6) {
                      n_cell = (
                        <>
                          {dxval}
                          <span
                            className="cell-fill cell-green"
                            aria-hidden="true"
                            tabIndex="-1">
                            &nbsp;
                          </span>
                        </>
                      );
                    }
                    if (dxval > 6) {
                      n_cell = (
                        <>
                          {dxval}
                          <span
                            className="cell-fill cell-amber"
                            aria-hidden="true"
                            tabIndex="-1">
                            &nbsp;
                          </span>
                        </>
                      );
                    }
                    dxval = n_cell;
                    ro_w.push(dxval);
                  } else {
                    ro_w.push('None');
                  }
                });
                rows_data.push(ro_w);
              }
            });
            let o_gu;
            if (filter_params.ou) {
              o_gu = filter_params.ou;
            } else {
              o_gu = '';
            }
            updateData(
              rows_data,
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
			if(err.name !== "AbortError"){
				setLoading(false);
				setErr({ error: true, msg: 'Error fetching data: ' + process .env.REACT_APP_ENV == "dev" ? err.message : "" });
			}else{
				console.log("Cancelling fetchAL requests");
			}
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
        // setOulvl(new_filter_params.level);
        setOulvl(5);
      }
      let new_url = filterUrlConstructor(
        new_filter_params.pe,
        new_filter_params.ou,
        new_filter_params.level,
        base_url
      );
      fetchAL(new_url);
    });
  };

  useEffect(() => {
    fetchAL(url);
    const act_comm_url =
      localStorage.getItem('active_commodity_url') || endpoints[0][process.env.REACT_APP_ENV == "dev" ? "local_url": "url"];
    onUrlChange(act_comm_url);
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
      console.log(`SS:AL: aborting requests...`);
      abortRequests.abort();
    };
  }, []);

  let data = {};
  data.theads = ['Name', 'MFL Code'];
  data.theads = [...data.theads, ...hds];
  data.rows = sdata;

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          {err.error ? (
            <></>
          ) : (
            <Select
              className={(classes.gridchild, 'text-bold p-0')}
              variant="outlined"
              autoWidth={true}
              style={{ fontSize: '1rem' }}
              defaultValue={endpoints[0][process.env.REACT_APP_ENV == "dev" ? "local_url": "url"]}
              onChange={chp => {
                sessionStorage.setItem(
                  'active_commodity_url',
                  chp.target.value
                );
                setCommodity(sessionStorage.getItem('active_commodity_url'));
                fetchAL(
                  filterUrlConstructor(
                    filter_params.pe,
                    filter_params.ou,
                    filter_params.level,
                    sessionStorage.getItem('active_commodity_url')
                  )
                );
              }}>
              {endpoints.map((sp, kyy) => {
                return (
                  <MenuItem
                    key={kyy}
                    className="text-bold"
                    value={sp[process.env.REACT_APP_ENV == "dev" ? "local_url": "url"]}>
                    {sp.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        </Grid>
        <Grid item xs={12} sm={9}>
          <Toolbar
            className={classes.gridchild}
            title={title}
            pe={prd}
            ou={oun}
            lvl={oulvl}
            filter_params={filter_params}
          />
        </Grid>
      </Grid>
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
