import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import {filterUrlConstructor, getValidOUs} from '../../common/utils'

import Toolbar from './components/Toolbar/Toolbar';
import ALTable from './components/Table/ALTable';

const queryString = require('query-string');
const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing(3), },
  content: { marginTop: theme.spacing(1) }
}));


const StockStatusAL = props => {
  const classes = useStyles();
  
  let filter_params = queryString.parse(props.location.hash)
  let url = filterUrlConstructor(filter_params.pe, filter_params.ou, filter_params.level, "http://41.89.94.99:3000/api/county/stockstatus/al")
  const [sdata, setSSData] = useState([['Loading...']]);
  const [prd, setPrd] = useState(null);
  const [validOUs, setValidOUs] = useState(
    JSON.parse( localStorage.getItem('validOUs') )
  );
  const [oun, setOun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  const [err, setErr] = useState({error: false, msg: ''});
  let title = `Stock Status: Artemether Lumefantrine.`

  const updateData = (rws, priod, ogu, levl) => {
    // console.log(`updateData = pe: ${prd}, ou:${oun}, lv:${oulvl}`)
    setSSData(rws)
    // setPrd(priod)
    // setOun(ogu)
    // setOulvl(levl) 
  }

  let fetchAL = async (the_url)=>{
    setLoading(true)
    setSSData([['Loading...']])
    // console.log(url)
    try {
      fetch(the_url).then(ad=>ad.json()).then(reply=>{
        //check if error here
        let rows_data = []
        const rows = reply.fetchedData.rows
      	let all_ous = []
        reply.fetchedData.metaData.dimensions.ou.map((o_ou, ix) => {
          if(validOUs.includes(o_ou) && rows.length>0){
          let ou_rows = rows.filter(o_r=>o_r[2]==o_ou)
          let ro_w = []
          ro_w.push(reply.fetchedData.metaData.items[o_ou].name)
          ro_w.push(o_ou)
          all_ous.push([reply.fetchedData.metaData.items[o_ou].name, o_ou])
          reply.fetchedData.metaData.dimensions.dx.map((o_dx, inx) => {
            let dx_rows = ou_rows.filter(o_dx_rw=>o_dx_rw[0] == o_dx)
            if(dx_rows.length > 0){ 
              ro_w.push(dx_rows[0][3])
            }else{
              ro_w.push('None')
            }
          })
          rows_data.push(ro_w)
          }
        })
        let o_gu
        if(filter_params.ou){o_gu = filter_params.ou}else{o_gu = ''}
        updateData(rows_data, reply.fetchedData.metaData.items[ reply.fetchedData.metaData.dimensions.pe[0] ].name, o_gu, oulvl)
        setLoading(false)
      })
    } catch (er) {
      setErr({error: true, msg: 'Error fetching data'})
    }
  }

  const onUrlChange = () => {
    props.history.listen( (location, action) => {
      let new_filter_params = queryString.parse(location.hash)
      if(new_filter_params.pe != '~' && new_filter_params.pe != '' && new_filter_params.pe != null){setPrd(new_filter_params.pe)}
      if(new_filter_params.ou != '~' && new_filter_params.ou != '' && new_filter_params.ou != null){setOun(new_filter_params.ou)}
      if(new_filter_params.level != '~' && new_filter_params.level != '' && new_filter_params.level != null){setOulvl(new_filter_params.level)}
      let new_url = filterUrlConstructor(new_filter_params.pe, new_filter_params.ou, new_filter_params.level, "http://41.89.94.99:3000/api/county/stockstatus/al")
      fetchAL(new_url)
    })
  }

  useEffect( () => {
    fetchAL(url)
    onUrlChange()
    getValidOUs().then(vo=>{
      let vFlS = JSON.parse( localStorage.getItem('validOUs') )
      if(vFlS && vFlS.length<1){
        setValidOUs(vo)
        // localStorage.removeItem('validOUs')
        // console.log("refetching validOUs with getValidOUs")
        // localStorage.setItem('validOUs', JSON.stringify(vo))
      }
    })
  }, [])

  let data = {}
  data.theads = [ "Name", "MFL Code", "RR%", "OT RR%", "AL6 SOH", "AL6 MOS", "AL12 SOH", "AL12 MOS", "AL18 SOH", "AL18 MOS", "AL24 SOH", "AL24 MOS", "ACT MOS", ]
  data.rows = sdata


  return (
    <div className={classes.root}>
      <Toolbar title={title} pe={prd} ou={oun} lvl={oulvl} />
      <div className={classes.content}>
        <ALTable pageTitle={title} theads={data.theads} rows={data.rows} loading={loading}/>
      </div>
    </div>
  );
};

export default StockStatusAL;
