import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
  filterUrlConstructor,
  getValidOUs,
  humanizePe,
  justFetch
} from '../../common/utils';
import { programs } from 'hcd-config';
import Toolbar from 'components/Toolbar/Toolbar';
import Table from 'components/Table/Table';
import MFLcell from 'components/Table/MFLcell';

const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const paige = activProg.pages.filter(ep => ep.page == 'Reporting Rate')[0];
const periodFilterType = paige.periodFilter;
const endpoints = paige.endpoints.filter(
  ep => ep.id == 'county__facility_reporting_rate'
);
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

const RRFacility = props => {
  const classes = useStyles();

  let filter_params = queryString.parse(props.location.hash);
  if (
    filter_params.pe == undefined ||
    filter_params.pe == '~' ||
    (filter_params.pe.search(';') <= 0 && periodFilterType == 'range')
  ) {
    filter_params.pe = 'LAST_6_MONTHS';
  }
  let [url, setUrl] = useState(
    filterUrlConstructor(
      filter_params.pe,
      filter_params.ou,
      filter_params.level,
      endpoints[0][process.env.REACT_APP_ENV == "dev" ? "local_url": "url"]
    )
  );
  const [rfdata, setRRFdata] = useState({
    data: ['Loading...'],
    heads: ['Loading...']
  });
  const [prd, setPrd] = useState(null);
  const [validOUs, setValidOUs] = useState(
    JSON.parse(localStorage.getItem('validOUs'))
  );
  const [oun, setOun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  const [err, setErr] = useState({ error: false, msg: '' });
  let title = `Reporting Rate: Facility`;

  const updateData = (rws, priod, ogu, levl) => {
    setRRFdata(rws);
    // setPrd(priod)
    // setOun(ogu)
    // setOulvl(levl)
  };

  /* ====================================================================
-----------------------------------------------------------------------
=====================================================================*/
  const fetchRRf = the_url => {
    setLoading(true);
    setRRFdata({ data: ['Loading...'], heads: ['Loading...'] });
    let valid_orgs = validOUs;
    let header = [];
    let tableData = [];
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
            header.push('Name');
            header.push('Code');
            reply.fetchedData.metaData.dimensions.pe.map(one_pe => {
              header.push(humanizePe(one_pe));
            });
            reply.fetchedData.metaData.dimensions.ou.map(one_ou => {
              if (valid_orgs.includes(one_ou)) {
                let trow = [];
                trow.push(reply.fetchedData.metaData.items[one_ou].name);
                trow.push(<MFLcell dhis_code={one_ou}/>);
                reply.fetchedData.metaData.dimensions.pe.map(one_pe => {
                  let rpt_count = getExpectedSub(
                    reply.fetchedData.rows,
                    one_pe,
                    one_ou
                  );
                  let reportval = getReport(
                    reply.fetchedData.rows,
                    one_pe,
                    one_ou
                  );
                  let n_cell_value = reportval + '/' + rpt_count;
                  let n_cell;
                  if (reportval) {
                    if (reportval == rpt_count) {
                      n_cell = (
                        <>
                          {n_cell_value}
                          <span
                            className="cell-fill cell-green"
                            aria-hidden="true"
                            tabIndex="-1">
                            &nbsp;
                          </span>
                        </>
                      );
                    } else {
                      n_cell = (
                        <>
                          {n_cell_value}
                          <span
                            className="cell-fill cell-amber"
                            aria-hidden="true"
                            tabIndex="-1">
                            &nbsp;
                          </span>
                        </>
                      );
                    }
                  } else {
                    n_cell = (
                      <>
                        {n_cell_value}
                        <span
                          className="cell-fill cell-amber"
                          aria-hidden="true"
                          tabIndex="-1">
                          &nbsp;
                        </span>
                      </>
                    );
                  }
                  trow.push(n_cell);
                });
                tableData.push(trow);
              }
            });

            // ~~~~~~~~~~~~~~~~~~~~ <<< SUMMARY_ROWS frm 2nd duplicate query SUMMARY_ROWS ~~~~~~~~~~~~~~~~~~~~
            /*reply.fetchedData.metaData.dimensions.ou.map( (one_ou) => {
						let summary_row = [];
						summary_row.push(reply.fetchedData.metaData.items[one_ou].name);
						reply.fetchedData.metaData.dimensions.pe.map( (one_pe) => {
							let rpt_count = getExpectedSub( reply.fetchedData.rows, one_pe, one_ou );
							let reportval = getReport(reply.fetchedData.rows, one_pe, one_ou);
							let n_cell_value = reportval + "/" + rpt_count
							let n_cell;
							if (reportval) {
								if (reportval == rpt_count) {
									n_cell = <>{n_cell_value}<span className='cell-fill cell-green' aria-hidden="true" tabIndex="-1">&nbsp;</span></>
								} else {
									n_cell = <>{n_cell_value}<span className='cell-fill cell-amber' aria-hidden="true" tabIndex="-1">&nbsp;</span></>
								}
							} else {
								n_cell = <>{n_cell_value}<span className='cell-fill cell-amber' aria-hidden="true" tabIndex="-1">&nbsp;</span></>
							}
						});
						tableData.push(summary_row)
					});*/
            // ~~~~~~~~~~~~~~~~~~~~ SUMMARY_ROWS frm 2nd duplicate query SUMMARY_ROWS >>> ~~~~~~~~~~~~~~~~~~~~

            let o_gu;
            if (filter_params.ou) {
              o_gu = filter_params.ou;
            } else {
              o_gu = '';
            }
            let d_ata = {};
            d_ata.data = tableData;
            d_ata.heads = header;
            updateData(
              d_ata,
              reply.fetchedData.metaData.items[
                reply.fetchedData.metaData.dimensions.pe[0]
              ].name +
                ' - ' +
                reply.fetchedData.metaData.items[
                  reply.fetchedData.metaData.dimensions.pe[
                    reply.fetchedData.metaData.dimensions.pe.length - 1
                  ]
                ].name,
              o_gu,
              oulvl
            );
          }
          setLoading(false);
        })
        .catch(err => {
			if(abortRequests.signal.aborted){ //if(err.name !== "AbortError"){
				setLoading(false);
				setErr({ error: true, msg: `Error fetching data: ' ${process .env.REACT_APP_ENV == "dev" ? err.message : ""}` });
			}else{
				console.log("Cancelling fetchRRf requests");
			}
        });
    } catch (er) {
      setErr({ error: true, msg: `Error fetching data ${process .env.REACT_APP_ENV == "dev" ? er.message : ""}` });
    }
  };
  //get the report details
  const getReport = (rows, period, orgunit) => {
    let rowval = 0;
    rows.map(one_row => {
      if (
        orgunit == one_row[2] &&
        period == one_row[1] &&
        one_row[0] == 'JPaviRmSsJW.ACTUAL_REPORTS'
      ) {
        rowval = parseInt(one_row[3]);
      }
    });
    return rowval;
  };
  //get the # expected to report
  const getExpectedSub = (rows, period, orgunit) => {
    var rowval = 0;
    rows.map(one_row => {
      if (
        orgunit == one_row[2] &&
        period == one_row[1] &&
        one_row[0] == 'JPaviRmSsJW.EXPECTED_REPORTS'
      ) {
        rowval = parseInt(one_row[3]);
      }
    });
    return rowval;
  };

  /* ====================================================================
-----------------------------------------------------------------------
=====================================================================*/

  const onUrlChange = base_url => {
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
				5,
				base_url
			);
			fetchRRf(new_url);
	  	}
    });
  };

  useEffect(() => {
    fetchRRf(url);
    onUrlChange(endpoints[0][process.env.REACT_APP_ENV == "dev" ? "local_url": "url"]);
    getValidOUs().then(vo => {
      let vFlS = JSON.parse(localStorage.getItem('validOUs'));
      if (vFlS && vFlS.length < 1) {
        setValidOUs(vo);
      }
    });

    return () => {
      console.log(`RR:Fac aborting requests...`);
      abortRequests.abort();
    };
  }, []);

  let dat_a = {};
  dat_a.theads = rfdata.heads;
  dat_a.rows = rfdata.data;

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
            theads={dat_a.theads}
            rows={dat_a.rows}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default RRFacility;
