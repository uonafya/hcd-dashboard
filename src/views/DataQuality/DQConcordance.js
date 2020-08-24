import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Select, MenuItem, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { filterUrlConstructor, getValidOUs, justFetch, defaultPeriod } from '../../common/utils';
import { programs } from 'hcd-config';
import Toolbar from 'components/Toolbar/Toolbar';
import PieChart from './components/PieChart/PieChart';
import Table from 'components/Table/Table';
import MFLcell from 'components/Table/MFLcell';

const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const paige = activProg.pages.filter(ep => ep.page == 'Data Quality: Concordance')[0];
const endpoints = paige.endpoints;
const periodFilterType = paige.periodFilter;

const abortRequests = new AbortController();

const queryString = require('query-string');
const useStyles = makeStyles(theme => ({
	root: {
	  padding: theme.spacing(4)
	},
	sstatus: {
	  height: '400px'
	}
  }));

const DQConcordance = props => {
  const classes = useStyles();

  let filter_params = queryString.parse(props.location.hash);
  if (
    filter_params.pe == undefined ||
    filter_params.pe == '~' ||
    (filter_params.pe.search(';') <= 0 && periodFilterType == 'range')
  ) {
    filter_params.pe = defaultPeriod();
  }
  const base_rr_url = endpoints[0][process.env.REACT_APP_ENV == "dev" ? "local_url": "url"];
  let [url, setUrl] = useState(
    filterUrlConstructor(
      defaultPeriod(),
      filter_params.ou,
      "5", //filter_params.level,
      base_rr_url
    )
  );
  const [validOUs, setValidOUs] = useState(
    JSON.parse(localStorage.getItem('validOUs'))
  );
  const [summaryData, setSummaryData] = useState([]);
  const [openingEqClosing, setOpeningEqClosing] = useState([[]]);
  const [openingNotEqClosing, setOpeningNotEqClosing] = useState([[]]);
  const [prd, setPrd] = useState(defaultPeriod());
  const [oun, setOun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  const [err, setErr] = useState({ error: false, msg: '' });
  const [commodity_url, setCommodityUrl] = useState(endpoints[0][process.env.REACT_APP_ENV == "dev" ? "local_url": "url"]);
  let title = `Data Quality: Concordance`;

  const updateSummaryData = (rws, priod, ogu, levl) => {
	setSummaryData(rws)
    // setOun(ogu)
    // setOulvl(levl)
  };


	
	//////// CUSTOM FXNs \\\\\\\\\\\\\\\\\\\\\\\\
	const filterItems = (array,query) => {
		return array.filter(function(el) {
			return el.indexOf(query) > -1;
		})
	}
	const sumArr = arr => arr.reduce((a, b) => a + b, 0);
	
	//////// CUSTOM FXNs \\\\\\\\\\\\\\\\\\\\\\\\

  let fetchDQConcordance = async rr_url => {
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

			///////////////////////////////////////////////////////
			/////////////////////// SC ///////////////////////////
			let pie_data = {};

			let o_eq_c = []	//ounit, id, closbal, openbal
			let o_noteq_c = []	//ounit, id, closbal, openbal
			let flArr = Array.from(reply.fetchedData.metaData.dimensions.pe, p_e_=>parseFloat(p_e_)); let newMonth = Math.max(...flArr); let oldMonth = Math.min(...flArr)
			reply.fetchedData.metaData.dimensions.ou.map(ou=>{
				if(validOUs.includes(ou)){
					let opening_newmonth_row = reply.fetchedData.rows.find(rw=>rw[2]==ou && rw[1]==newMonth) || [null,null,null,null]
					let opening_newmonth = opening_newmonth_row[3] || null
					let closing_oldmonth_row = reply.fetchedData.rows.find(rw=>rw[2]==ou && rw[1]==oldMonth) || [null,null,null,null]
					let closing_oldmonth = closing_oldmonth_row[3] || null
					let r_ow = [reply.fetchedData.metaData.items[ou].name, <MFLcell dhis_code={ou}/>, closing_oldmonth, opening_newmonth]
					if(closing_oldmonth == opening_newmonth && closing_oldmonth != null && opening_newmonth != null){
						o_eq_c.push(r_ow)
					}else{
						o_noteq_c.push(r_ow)
					}
				}
			})
			
			setOpeningEqClosing(o_eq_c)

			setOpeningNotEqClosing(o_noteq_c)

			pie_data.month1 = reply.fetchedData.metaData.items[oldMonth].name
			pie_data.month2 = reply.fetchedData.metaData.items[newMonth].name
			
			pie_data.eq_title = `Opening SOH (${pie_data.month2}) = Closing SOH (${pie_data.month1})`
			pie_data.eq = o_eq_c.length
			let subtitle = reply.fetchedData.metaData.items[ reply.fetchedData.metaData.dimensions.dx[0] ].name
			pie_data.subtitle = subtitle.replace('Physical Count', '').replace('Opening Balance', '')
			
			pie_data.n_eq_title = `Opening SOH (${pie_data.month2}) ≠ Closing SOH (${pie_data.month1})`
			pie_data.n_eq = o_noteq_c.length

			updateSummaryData(pie_data, null, null, null);
            setLoading(false);
            
			/////////////////////// SC ///////////////////////////
			///////////////////////////////////////////////////////
          }
        })
        .catch(err => {
			if(abortRequests.signal.aborted){ //if(err.name !== "AbortError"){
				setLoading(false);
				setErr({ error: true, msg: `Error fetching data: ' ${process .env.REACT_APP_ENV == "dev" ? err.message : ""}` });
			}else{
				console.log("Cancelling fetchDQConcordance requests");
			}
        });
    } catch (er) {
      setErr({ error: true, msg: 'Error fetching data' });
    }
  };

  const onUrlChange = base_url => {
	  props.history.listen((location, action) => {
		if(location.pathname == paige.route){
			let new_filter_params = queryString.parse(location.hash);
			if ( new_filter_params.pe.length ==6 ){
				new_filter_params.pe = defaultPeriod(new_filter_params.pe)
				setPrd(new_filter_params.pe)
			}
			if ( new_filter_params.pe.includes("LAST") ){
				new_filter_params.pe = defaultPeriod()
				setPrd(new_filter_params.pe)
			}
			if (
				new_filter_params.pe == '~' ||
				new_filter_params.pe == '' ||
				new_filter_params.pe == null 
			){
					setPrd(defaultPeriod())
					new_filter_params.pe = defaultPeriod()
			}
		if (
			new_filter_params.pe != '~' &&
			new_filter_params.pe != '' &&
			new_filter_params.pe != null &&
			new_filter_params.pe.search(';') > 0
		) {
			setPrd(new_filter_params.pe);
		}
		if (new_filter_params.pe && new_filter_params.pe.search(';') <= 0 && new_filter_params.length > 4) {
				let ofp = new_filter_params.pe
				setPrd(defaultPeriod(ofp));
				new_filter_params.pe = defaultPeriod(ofp);
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
		let n_b_url = commodity_url || base_url
		let new_url = filterUrlConstructor(
			new_filter_params.pe,
			new_filter_params.ou,
			new_filter_params.level,
			n_b_url
		);
		fetchDQConcordance(new_url);
	  	}
    });
  };

  useEffect(() => {
    fetchDQConcordance(url);
	onUrlChange(base_rr_url);
	getValidOUs().then(vo => {
		let vFlS = JSON.parse(localStorage.getItem('validOUs'));
		if (vFlS && vFlS.length < 1) {
		  setValidOUs(vo);
		}
	});
    return () => {
      console.log(`DQ:Concordance aborting requests...`);
      abortRequests.abort();
    };
  }, []);

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
						'current_commodity',
						chp.target.value
						);
						setCommodityUrl(sessionStorage.getItem('current_commodity'));
						let new_pe = prd
						if(filter_params.pe.length == 6){new_pe = defaultPeriod(filter_params.pe); setPrd(new_pe)}
						if(!filter_params.pe.includes(';')){new_pe = defaultPeriod()}
						fetchDQConcordance(
							filterUrlConstructor(
								new_pe,
								filter_params.ou,
								filter_params.level,
								sessionStorage.getItem('current_commodity')
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
			<>
				<Grid item container lg={12} md={12} xl={12} xs={12} justify="center">
					<Grid item lg={12} md={12} xl={12} xs={12}>
						<PieChart data={summaryData} title='Opening SOH vs Closing SOH comparison' />
					</Grid>
				</Grid>
				<br />
				<Grid item container lg={12} md={12} xl={12} xs={12}>
					<Grid item lg={6} md={6} xl={6} xs={12} className="p-5">
						<Table
							pageTitle={`Opening Balance NOT equal Closing SOH (${openingNotEqClosing.length})`}
							theads={[ 'Name', 'Code', 'Closing bal.', 'Opening SOH' ]}
							rows={openingNotEqClosing}
							loading={false}
						/>
					</Grid>
					<Grid item lg={6} md={6} xl={6} xs={12} className="p-5">
						<Table
							pageTitle={`Opening Balance equals Closing SOH (${openingEqClosing.length})`}
							theads={[ 'Name', 'Code', 'Closing bal.', 'Opening SOH' ]}
							rows={openingEqClosing}
							loading={false}
						/>
					</Grid>
				</Grid>
			</>
        )}
      </div>
    </div>
  );
};

export default DQConcordance;
