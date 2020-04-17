import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Toolbar from 'components/Toolbar/Toolbar';
import { filterUrlConstructor } from 'common/utils'

import { Budget, TotalUsers, MOSbyCommodity, DashStockStatus } from './components';

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
  
   /* ========================================================================
   <Stock_Status
   ======================================================================== */
  const alnames = ["AL6","AL12","AL18","AL24","AL all","AS inj","SP tabs","RDTs"];
   /* ========================================================================
   Stock_Status />
   ======================================================================== */
  


   /* ========================================================================
   <MOS_by_commo
   ======================================================================== */
  let filter_params = queryString.parse(props.location.hash)
  let mos_url = filterUrlConstructor(filter_params.pe, filter_params.ou, filter_params.level, "http://0.0.0.0:3000/api/dashboard/mos-by-commodity")
  let ss_url = filterUrlConstructor(filter_params.pe, filter_params.ou, filter_params.level, "http://0.0.0.0:3000/api/dashboard/stockstatus")
  const [mosdata, setMOSData] = useState([[]]);
  const [ssdata, setSSData] = useState([['Loading...']]);
  const [prd, setPrd] = useState(null);
  const [oun, setOun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  let [minmax, setMinMax] = useState([9,18])
  let [yminmax, setyMinMax] = useState([0,24])
  const [err, setErr] = useState({error: false, msg: ''});
  let title = `Overview.`

  const updateMOSData = (rws, priod, ogu, levl) => {
    setMOSData(rws)
    setPrd(priod)
    setOun(oun)
    // setOulvl(levl) 
  }

  const updateSSData = (rws, priod, ogu, levl) => {
    setSSData(rws)
    // setPrd(priod)
    // setOun(ogu)
    // setOulvl(levl) 
  }

  let fetchMOS = async (mos_url)=>{
    setLoading(true)
    setMOSData([[0,0,0,0,0,0,0,0]])
    // console.log(url)
    try {
      fetch(mos_url).then(ad=>ad.json()).then(reply=>{
        //check if error here
      	let rows_data = []
        reply.fetchedData.metaData.dimensions.dx.map((o_dx, inx) => {
          const rows = reply.fetchedData.rows
          if(rows.length>0){
            // console.log(`reply = ${JSON.stringify(reply)}`)
            let dx_rows = rows.filter(o_dx_rw=>o_dx_rw[0] == o_dx)
            if(dx_rows.length > 0){ 
              rows_data.push( parseFloat(dx_rows[0][3]) )
            }else{
              rows_data.push(0)
            }
          }
        })
        // console.log(`rows_data = ${JSON.stringify(rows_data)}`)

        let o_gu = reply.fetchedData.metaData.dimensions.ou[0]
        if(filter_params.ou && filter_params.ou != '~'){o_gu = filter_params.ou}else{o_gu = reply.fetchedData.metaData.dimensions.ou[0]}
        updateMOSData(rows_data, reply.fetchedData.metaData.items[ reply.fetchedData.metaData.dimensions.pe[0] ].name, o_gu, null)

        if(o_gu!=="HfVjCurKxh2" && o_gu!=="~") {
          setMinMax([3,6]);
          setyMinMax([0,10]);
        }

        setLoading(false)
      })
    } catch (er) {
      setErr({error: true, msg: 'Error fetching data'})
    }
  }



  let getValue = (arrayy, searchTerm) => {
    let the_val = 0;
    arrayy.map(function (arrayItem) {
        if (searchTerm == arrayItem[0]) {
            the_val = parseFloat(arrayItem[3]);
        }
    });
    return parseFloat(the_val);
  }


  let fetchSStatus = (ss_url) => {
    setSSData([['Loading...']])
    fetch(ss_url).then(ad=>ad.json()).then(reply=>{
      
      const data = reply.fetchedData
      let tableData = [];
      let phycount = '';
      let adjc = '';
      let mos = '';
      let countercon = 0;
      let thedx = data.metaData.dimensions.dx;
      
      let phy_count_arr = thedx.slice(8, 16);
      let phy_count_arr_vals = [];
      phy_count_arr.map(function (onePhy, inx2) { 
          let onePhy_val = getValue(data.rows, onePhy);
          if(onePhy_val == undefined || onePhy_val == null || onePhy_val == ''){
              phy_count_arr_vals.push(0);
          }else{
              phy_count_arr_vals.push(onePhy_val);
          }
      });

      let adj_cons_arr = thedx.slice(16, 24);
      let adj_cons_arr_vals = [];
      adj_cons_arr.map(function (oneAdj, inx) { 
          let oneAdj_val = getValue(data.rows, oneAdj);
          if(oneAdj_val == undefined || oneAdj_val == null || oneAdj_val == ''){
              adj_cons_arr_vals.push(0);
          }else{
              adj_cons_arr_vals.push(oneAdj_val);
          }
      });
      
      let mos_arr = thedx.slice(0, 8);
      let mos_arr_vals = [];
      mos_arr.map(function (oneMOS, inx0) { 
          let oneMOS_val = getValue(data.rows, oneMOS);
          if(oneMOS_val == undefined || oneMOS_val == null || oneMOS_val == ''){
              mos_arr_vals.push(0);
          }else{
              mos_arr_vals.push(oneMOS_val);
          }
      });
      
      adj_cons_arr.map(function (entry, key) {
          const tablerow = []
          tablerow.push(alnames[countercon]);
          adjc = adj_cons_arr_vals[key];
          phycount = phy_count_arr_vals[key]
          mos = mos_arr_vals[key];
          let bgcolor = '#ffffff';
          let fcolor = '#222222';
          if(mos<=0){ bgcolor = '#ff0000'; fcolor = '#ffffff'; }
          if (mos > 0 && mos< 3){ bgcolor = '#ffc7ce'; fcolor = '#222222'; }
          if (mos >= 3 && mos<= 6){ bgcolor = '#7bd48d'; fcolor = '#222222'; }
          if(mos>6){ bgcolor = '#ffeb9c'; fcolor = '#222222'; }
          tablerow.push( adjc.toFixed(0) );
          tablerow.push( phycount.toFixed(0) );
          tablerow.push(mos.toFixed(1));
          // tablerow.push(`fcolor:${fcolor}, bgcolor:${bgcolor}, ${mos.toFixed(1)}` );
          tableData.push(tablerow)
          countercon++;

      })
      updateSSData(tableData, data.metaData.items[ data.metaData.dimensions.pe[0] ].name, data.metaData.dimensions.ou[0], null)
      // console.log(`tableData: ${JSON.stringify(tableData,'',2)}`);
    })
  }

  const onUrlChange = () => {
    props.history.listen( (location, action) => {
      let new_filter_params = queryString.parse(location.hash)
      if(new_filter_params.pe != '~' && new_filter_params.pe != '' && new_filter_params.pe != null){setPrd(new_filter_params.pe)}
      if(new_filter_params.ou != '~' && new_filter_params.ou != '' && new_filter_params.ou != null){setOun(new_filter_params.ou)}
      if(new_filter_params.level != '~' && new_filter_params.level != '' && new_filter_params.level != null){setOulvl(new_filter_params.level)}
      let new_mos_url = filterUrlConstructor(new_filter_params.pe, new_filter_params.ou, new_filter_params.level, "http://0.0.0.0:3000/api/dashboard/mos-by-commodity")
      fetchMOS(new_mos_url)
      let new_ss_url = filterUrlConstructor(new_filter_params.pe, new_filter_params.ou, new_filter_params.level, "http://0.0.0.0:3000/api/dashboard/stockstatus")
      fetchSStatus(new_ss_url)
    })
  }

  useEffect( () => {
    fetchMOS(mos_url)
    fetchSStatus(ss_url)
    onUrlChange()
  }, [])

  
  /* ========================================================================
   MOS_by_commo />
   ======================================================================== */

  return (
    <div className={classes.root}>
      <Toolbar title={title} pe={prd} ou={oun} lvl={null} />
      <Grid container spacing={4}>
        {/* <Grid item lg={3} sm={6} xl={3} xs={12} > <Budget /> </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12} > <TotalUsers /> </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12} > <Budget /> </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12} > <TotalUsers /> </Grid> */}
        
        <Grid item lg={6} md={6} xl={6} xs={12} className={classes.sstatus}>
          <DashStockStatus pageTitle={`Commodities Stock Status`} theads={["Commodity", "adj. AMC", "Latest SOH", "MOS"]} rows={ssdata} loading={false}/>
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12} >
          <MOSbyCommodity minmax={minmax} yminmax={yminmax} data={mosdata} />
        </Grid>
        
        <Grid item lg={12} md={12} xl={12} xs={12} >
          {/* <DashStockStatus pageTitle={`Commodities Stock Status`} theads={["Commodity", "adj. AMC", "Latest SOH", "MOS"]} rows={data_rows} loading={false}/> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
