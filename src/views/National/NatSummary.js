import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Toolbar from 'components/Toolbar/Toolbar';
import { filterUrlConstructor } from 'common/utils'

import { NatSummaryGraph, KEMSAstockSummary } from './components';

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
  // const alnames = ["AL6","AL12","AL18","AL24","AL all","AS inj","SP tabs","RDTs"];
  const alnames = ["Artemether-Lumefantrine 20/120 Tabs 6s", "Artemether-Lumefantrine 20/120 Tabs 12s",
  "Artemether-Lumefantrine 20/120 Tabs 18s", "Artemether-Lumefantrine 20/120 Tabs 24s", 
  "Artesunate Injection", "Sulphadoxine Pyrimethamine Tabs", "Rapid Diagnostic Tests"];
   /* ========================================================================
   Stock_Status />
   ======================================================================== */
  


   let filter_params = queryString.parse(props.location.hash)
   let summ_url_facility = filterUrlConstructor(filter_params.pe, filter_params.ou, filter_params.level, "http://41.89.94.99:3000/api/national/summary/facility-mos")
   let summ_url_kemsa = filterUrlConstructor(filter_params.pe, filter_params.ou, filter_params.level, "http://41.89.94.99:3000/api/national/summary/kemsa-mos")
   let summ_url_pending = filterUrlConstructor(filter_params.pe, filter_params.ou, filter_params.level, "http://41.89.94.99:3000/api/national/summary/pending-mos")
   let kemsa_url = filterUrlConstructor(filter_params.pe, filter_params.ou, filter_params.level, "http://41.89.94.99:3000/api/national/summary/kemsasummary")
   const [facilityMOSdata, setFacilityMOSdata] = useState([[]]);
   const [kemsaMOSdata, setKEMSAMOSdata] = useState([[]]);
   const [pendingMOSdata, setPendingMOSdata] = useState([[]]);

   const [kemsaSUMMARYdata, setKEMSAsummaryData] = useState([['Loading...']]);
   const [prd, setPrd] = useState(filter_params.pe);
   const [oun, setOun] = useState(filter_params.ou);
   const [loading, setLoading] = useState(true);
   const [oulvl, setOulvl] = useState(null);
   let [minmax, setMinMax] = useState([9,18])
   let [yminmax, setyMinMax] = useState([0,24])
   const [err, setErr] = useState({error: false, msg: ''});
   let title = `National Summary`
   
   const updateFacilityMOSdata = (rws, priod, ogu, levl) => {
      setFacilityMOSdata(rws)
      setPrd(priod)
      // setOun(oun)
      // setOulvl(levl) 
    }
    const updateKEMSAMOSdata = (rws, priod, ogu, levl) => {
      setKEMSAMOSdata(rws)
    }
    const updatePendingMOSdata = (rws, priod, ogu, levl) => {
      setPendingMOSdata(rws)
    }
  
    const updateKEMSAsummaryData = (rws, priod, ogu, levl) => {
      setKEMSAsummaryData(rws)
    }
  
  let fetchMOSsummary = async (summ_url_facility, summ_url_kemsa, summ_url_pending)=>{
    setLoading(true)
    try {
      fetch(summ_url_facility).then(ad=>ad.json()).then(reply=>{
        //check if error here
      	let rows_data = []
        reply.fetchedData.metaData.dimensions.dx.map((o_dx, inx) => {
          const rows = reply.fetchedData.rows
          if(rows.length>0){
            let dx_rows = rows.filter(o_dx_rw=>o_dx_rw[0] == o_dx)
            
            if(dx_rows.length > 0){ 
              rows_data.push( parseFloat(dx_rows[0][3]) )
            }else{
              rows_data.push(0)
            }
          }
        })

        let o_gu = reply.fetchedData.metaData.dimensions.ou[0]
        if(filter_params.ou && filter_params.ou != '~'){o_gu = filter_params.ou}else{o_gu = reply.fetchedData.metaData.dimensions.ou[0]}
        updateFacilityMOSdata(rows_data, reply.fetchedData.metaData.items[ reply.fetchedData.metaData.dimensions.pe[0] ].name, o_gu, null)
        setLoading(false)
      })
      //kemsa
      .then( ()=>{
        fetch(summ_url_kemsa).then(ad=>ad.json()).then(reply=>{
          //check if error here
            let rows_data = []
          reply.fetchedData.metaData.dimensions.dx.map((o_dx, inx) => {
            const rows = reply.fetchedData.rows
            if(rows.length>0){
              let dx_rows = rows.filter(o_dx_rw=>o_dx_rw[0] == o_dx)
              
              if(dx_rows.length > 0){ 
                rows_data.push( parseFloat(dx_rows[0][3]) )
              }else{
                rows_data.push(0)
              }
            }
          })
      
          let o_gu = reply.fetchedData.metaData.dimensions.ou[0]
          if(filter_params.ou && filter_params.ou != '~'){o_gu = filter_params.ou}else{o_gu = reply.fetchedData.metaData.dimensions.ou[0]}
          updateKEMSAMOSdata(rows_data, reply.fetchedData.metaData.items[ reply.fetchedData.metaData.dimensions.pe[0] ].name, o_gu, null)
          setLoading(false)
        })
      })
      //pending
      .then( ()=>{
        fetch(summ_url_pending).then(ad=>ad.json()).then(reply=>{
          //check if error here
            let rows_data = []
          reply.fetchedData.metaData.dimensions.dx.map((o_dx, inx) => {
            const rows = reply.fetchedData.rows
            if(rows.length>0){
              let dx_rows = rows.filter(o_dx_rw=>o_dx_rw[0] == o_dx)
              
              if(dx_rows.length > 0){ 
                rows_data.push( parseFloat(dx_rows[0][3]) )
              }else{
                rows_data.push(0)
              }
            }
          })
      
          let o_gu = reply.fetchedData.metaData.dimensions.ou[0]
          if(filter_params.ou && filter_params.ou != '~'){o_gu = filter_params.ou}else{o_gu = reply.fetchedData.metaData.dimensions.ou[0]}
          updatePendingMOSdata(rows_data, reply.fetchedData.metaData.items[ reply.fetchedData.metaData.dimensions.pe[0] ].name, o_gu, null)
          setLoading(false)
        })
      })
    } catch (er) {
      setErr({error: true, msg: 'Error fetching data'})
    }
  }


  let fetchKEMSAsummaryData = (kemsa_url) => {
    setKEMSAsummaryData([['Loading...']])
    fetch(kemsa_url).then(ad=>ad.json()).then(reply=>{
      
      const data = reply.fetchedData
      // ========================
      //products to be displayed
      let products = [ "Artemether-Lumefantrine 20/120 Tabs 6s", "Artemether-Lumefantrine 20/120 Tabs 12s", "Artemether-Lumefantrine 20/120 Tabs 18s", "Artemether-Lumefantrine 20/120 Tabs 24s", "Artesunate Injection", "Sulphadoxine Pyrimethamine Tabs", "Rapid Diagnostic Tests", ];

      //productids
      let productids = [ "Aui7lNDOsSF", "iZe9QHpC31Y", "Kkh8ZtRWFmX", "E7M967QxxFc", "Wupc6TOJhcK", "lZCba7Ijb7x", "ALnonKSyDct", ];

      //data elements
      let dataelement = [ "svPoNZ3VkVx", "G3eMNWySdZq", "Q9rPivWnD4K", "HMTuusGLTUj", "sEiFVVjqcfg", ];

      //doses for each product
      let dxuom = [ "doses", "doses", "doses", "doses", "vials", "tablets", "tests", ];

      let kemsa_rows = []
      products.map( (name, index) => {
        let table_row = [];
        table_row.push(name);
        dataelement.map( (ref, ky) =>{
          let dataval = 0;
          let rowref = productids[index] + "." + ref;
          data.rows.map( (rowentry, rowkey) => {
            if (rowentry[0] == rowref) {
              dataval = rowentry[3];
            }
          });
          table_row.push( parseFloat(dataval) );
        });
        kemsa_rows.push(table_row);
      });
      // ========================
      updateKEMSAsummaryData(kemsa_rows, data.metaData.items[ data.metaData.dimensions.pe[0] ].name, data.metaData.dimensions.ou[0], null)
    })
  }

  const onUrlChange = () => {
    props.history.listen( (location, action) => {
      let new_filter_params = queryString.parse(location.hash)
      if(new_filter_params.pe != '~' && new_filter_params.pe != '' && new_filter_params.pe != null){setPrd(new_filter_params.pe)}
      if(new_filter_params.ou != '~' && new_filter_params.ou != '' && new_filter_params.ou != null){setOun(new_filter_params.ou)}
      if(new_filter_params.level != '~' && new_filter_params.level != '' && new_filter_params.level != null){setOulvl(new_filter_params.level)}
      let new_summ_url_facility = filterUrlConstructor(new_filter_params.pe, new_filter_params.ou, new_filter_params.level, "http://41.89.94.99:3000/api/national/summary/facility-mos")
      let new_summ_url_kemsa = filterUrlConstructor(new_filter_params.pe, new_filter_params.ou, new_filter_params.level, "http://41.89.94.99:3000/api/national/summary/kemsa-mos")
      let new_summ_url_pending = filterUrlConstructor(new_filter_params.pe, new_filter_params.ou, new_filter_params.level, "http://41.89.94.99:3000/api/national/summary/pending-mos")
      fetchMOSsummary(new_summ_url_facility, new_summ_url_kemsa, new_summ_url_pending)

      let new_kemsa_url = filterUrlConstructor(new_filter_params.pe, new_filter_params.ou, new_filter_params.level, "http://41.89.94.99:3000/api/national/summary/kemsasummary")
      fetchKEMSAsummaryData(new_kemsa_url)
    })
  }

  useEffect( () => {
    fetchMOSsummary(summ_url_facility,summ_url_kemsa,summ_url_pending)
    fetchKEMSAsummaryData(kemsa_url)
    onUrlChange()
  }, [])


  return (
    <div className={classes.root}>
      <Toolbar title={title} pe={prd} ou={oun} lvl={null} />
      <Grid container spacing={4}>
        {/* <Grid item lg={3} sm={6} xl={3} xs={12} > <Budget /> </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12} > <TotalUsers /> </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12} > <Budget /> </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12} > <TotalUsers /> </Grid> */}
        
        <Grid item lg={12} md={12} xl={12} xs={12} justify="center" container>
          <Grid item lg={9} md={9} xl={9} xs={12}>
            <NatSummaryGraph 
              data={{
                pending: pendingMOSdata,
                kemsa: kemsaMOSdata,
                facility: facilityMOSdata
              }} 
            />
          </Grid>
        </Grid>
        <br/>
        <Grid item lg={12} md={12} xl={12} xs={12} >
          <KEMSAstockSummary pageTitle={`KEMSA Stock Summary`} theads={["Commodity", "Opening SOH", "Total Receipts", "Total Issues", "Closing SOH", "Pending Stock"]} rows={kemsaSUMMARYdata} loading={false}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
