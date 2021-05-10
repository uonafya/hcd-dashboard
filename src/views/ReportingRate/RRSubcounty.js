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
import ShadedCell from 'components/Table/ShadedCell';

const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const paige = activProg.pages.filter(ep => ep.id == 'county__subcounty_reporting_rate')[0];
const periodFilterType = paige.periodFilter;
const endpoints = paige.endpoints.filter(
    ep => ep.id == 'county__subcounty_reporting_rate'
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

const RRSubcounty = props => {
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
            endpoints[0][process.env.REACT_APP_ENV == "dev" ? "local_url" : "url"]
        )
    );
    const [rsdata, setRRSdata] = useState({
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
    let title = `Reporting Rate: Sub-county`;

    const updateData = (rws, priod, ogu, levl) => {
        setRRSdata(rws);
        // setPrd(priod)
        // setOun(ogu)
        // setOulvl(levl)
    };

    /* ====================================================================
  -----------------------------------------------------------------------
  =====================================================================*/
    const fetchRRs = async the_url => {
        // setLoading(true);
        // setRRSdata({ data: ['Loading...'], heads: ['Loading...'] });
        let valid_orgs = validOUs;
        let header = [];
        let tableData = [];
        try {
            //   fetch(the_url, { signal: abortRequests.signal })
            return justFetch(the_url, { signal: abortRequests.signal })
                // .then(s_p => s_p.json())
                .then(reply => {
                    // console.log('reply: '+JSON.stringify(reply))
                    if (reply == undefined || reply?.fetchedData == undefined || reply?.fetchedData?.error) {
                        // console.error(reply)
                        let e_rr = {
                            error: true,
                            msg: reply?.fetchedData?.message || '',
                            ...reply
                        }
                        if(e_rr.msg.includes('aborted')){
                            props.history.go(0)
                        }
                        return e_rr
                        // setErr({
                        //     error: true,
                        //     msg: reply?.fetchedData?.message || '',
                        //     ...reply
                        // });
                    } else {
                        // setErr({ error: false, msg: '' });
                        header.push('Name');
                        // header.push('Code');
                        reply.fetchedData.metaData.dimensions.pe.map(one_pe => {
                            header.push(humanizePe(one_pe));
                        });
                        reply.fetchedData.metaData.dimensions.ou.map(one_ou => {
                            let rows_filteredby_ou = reply.fetchedData.rows.filter(r_o => r_o[2] == one_ou)
                            let expected = rows_filteredby_ou.find(ex => ex[0].includes('.EXPECTED_REPORTS'));
                            if (expected && expected.length > 0) {
                                let trow = [];
                                trow.push(reply.fetchedData.metaData.items[one_ou].name);
                                // trow.push(<MFLcell dhis_code={one_ou}/>);
                                reply.fetchedData.metaData.dimensions.pe.map(one_pe => {
                                    let rows_filteredby_ou_pe = rows_filteredby_ou.filter(r_o => r_o[1] == one_pe)
                                    let rows_actual_rpt = rows_filteredby_ou_pe.filter(ra => ra[0].includes('.ACTUAL_REPORTS'))
                                    let v_l = []; rows_actual_rpt.map(ee => v_l.push(parseFloat(ee[3])))
                                    // let rpt_count = v_l.reduce((a, b)=>{ return a + b; }, 0);
                                    let rpt_count = rows_actual_rpt.length
                                    let reportval = getReport(rows_filteredby_ou_pe, one_pe, one_ou);
                                    if (parseFloat(reportval) > 0) { reportval = 1 } else { reportval = 0 }
                                    let n_cell_value = reportval + '/' + rpt_count;
                                    let n_cell;
                                    if (reportval) {
                                        if (reportval == rpt_count) {
                                            n_cell = <ShadedCell classes={"cell-fill cell-green"} val={n_cell_value} />
                                        } else {
                                            n_cell = <ShadedCell classes={"cell-fill cell-amber"} val={n_cell_value} />
                                        }
                                    } else {
                                        n_cell = <ShadedCell classes={"cell-fill cell-amber"} val={n_cell_value} />
                                    }
                                    trow.push(n_cell);
                                });
                                tableData.push(trow);
                            }
                        });

                        let o_gu;
                        if (filter_params.ou) {
                            o_gu = filter_params.ou;
                        } else {
                            o_gu = '';
                        }
                        let d_ata = {};
                        d_ata.data = tableData;
                        d_ata.heads = header;
                        return d_ata
                        updateData(
                            d_ata,
                            reply.fetchedData.metaData.items[reply.fetchedData.metaData.dimensions.pe[0]].name +
                            ' - ' +
                            reply.fetchedData.metaData.items[reply.fetchedData.metaData.dimensions.pe[reply.fetchedData.metaData.dimensions.pe.length - 1]].name,
                            o_gu,
                            oulvl
                        );
                    }
                    //   setLoading(false);
                })
                .catch(err => {
                    // console.error(err);
                    if (abortRequests.signal.aborted) { //if(err.name !== "AbortError"){
                        return { error: true, msg: `Error fetching data: ' ${process.env.REACT_APP_ENV == "dev" ? err.message : ""}` }
                        // setLoading(false);
                        setErr({ error: true, msg: `Error fetching data: ' ${process.env.REACT_APP_ENV == "dev" ? err.message : ""}` });
                    } else {
                        console.log("Cancelling fetchRRs requests");
                    }
                });
        } catch (er) {
            setErr({ error: true, msg: `Error fetching data ${process.env.REACT_APP_ENV == "dev" ? er.message : ""}` });
        }
    };

    //get the report details
    const getReport = (rows, period, orgunit) => {
        let rowval = 0;
        rows.map(one_row => {
            if (
                orgunit == one_row[2] &&
                period == one_row[1] &&
                one_row[0].includes('.ACTUAL_REPORTS')
            ) {
                rowval = parseInt(one_row[3]);
            }
        });
        return rowval;
    };


    /* ====================================================================
  -----------------------------------------------------------------------
  =====================================================================*/


    useEffect(() => {
        let mounted = true
        let u_r_l = endpoints[0][process.env.REACT_APP_ENV == "dev" ? "local_url" : "url"]
        if (mounted) {
            setLoading(true)

            let ftch = (r_l) => {
                setRRSdata({ data: ['Loading...'], heads: ['Loading...'] });
                fetchRRs(r_l).then(f => {
                    setLoading(false)
                    if (f?.error && f?.msg) {
                        setErr(f)
                    }else{
                        updateData(f, '', '', '')
                    }
                });
            }
            ftch(url)
            props.history.listen((location, action) => {
                /////-----
                if (location.pathname == paige.route) {
                    let new_filter_params = queryString.parse(location.hash);
                    if (
                        new_filter_params.pe != '~' &&
                        new_filter_params.pe != '' &&
                        new_filter_params.pe != null
                    ) {
                        if(mounted) {setPrd(new_filter_params.pe); }
                    }
                    if (new_filter_params.pe && new_filter_params.pe.search(';') <= 0) {
                        new_filter_params.pe = 'LAST_6_MONTHS';
                        if(mounted) {setPrd('LAST_6_MONTHS'); }
                    }
                    if (
                        new_filter_params.ou != '~' &&
                        new_filter_params.ou != '' &&
                        new_filter_params.ou != null
                    ) {
                        if(mounted) {setOun(new_filter_params.ou); }
                    }
                    if (
                        new_filter_params.level != '~' &&
                        new_filter_params.level != '' &&
                        new_filter_params.level != null
                    ) {
                        if(mounted) {setOulvl(new_filter_params.level); }
                    }
                    let new_url = filterUrlConstructor(
                        new_filter_params.pe,
                        new_filter_params.ou,
                        5,
                        u_r_l
                    );
                    ftch(new_url)
                    console.info('h ', new_url)
                }
                /////-----
            })
            
            getValidOUs().then(vo => {
                let vFlS = JSON.parse(localStorage.getItem('validOUs'));
                if (vFlS && vFlS.length < 1) {
                    setValidOUs(vo);
                }
            });
            setLoading(false)
        }

        return () => {
            mounted = false;
            console.log(`RR:Sub aborting requests...`);
            abortRequests.abort();
        };
    }, []);

    let dat_a = {};
    dat_a.theads = rsdata.heads;
    dat_a.rows = rsdata.data;

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

export default RRSubcounty;
