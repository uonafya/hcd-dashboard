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
  let url = filterUrlConstructor(filter_params.pe, filter_params.ou, filter_params.level, "http://0.0.0.0:3000/api/county/stockstatus/al")
  

  const [sdata, setSSData] = useState([['Loading...']]);
  const [prd, setPrd] = useState('');
  const [validOUs, setValidOUs] = useState(
    JSON.parse( localStorage.getItem('validOUs') )
  );
  const [oun, setOun] = useState('');
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState('');
  const [err, setErr] = useState({error: false, msg: ''});
  const [location, setLocation] = useState(props.location)
  // let title = `Stock Status: Artemether Lumefantrine. ${prd==""||prd==null?"":" - "+prd+", "}${oun==""||oun==null?"":oun}`
  let title = `Stock Status: Artemether Lumefantrine.`

  const updateData = (rws, priod, ogu, levl) => {
    setSSData(rws)
    setPrd(priod)
    setOun(ogu)
    setOulvl(levl) 
  }

  let fetchAL = async (the_url)=>{
    setLoading(true)
    setSSData([['Loading...']])
    console.log(url)
    try {
      fetch(the_url).then(ad=>ad.json()).then(reply=>{
        //check if error here
      	let rows_data = []
      	let all_ous = []
		reply.fetchedData.metaData.dimensions.ou.map((o_ou, ix) => {
			if(validOUs.includes(o_ou)){
			let ou_rows = reply.fetchedData.rows.filter(o_r=>o_r[2]==o_ou)
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
    	updateData(rows_data, reply.fetchedData.metaData.dimensions.pe, filter_params.ou, [])
		setLoading(false)
      })
    } catch (er) {
      setErr({error: true, msg: 'Error fetching data'})
    }
  }

  const onUrlChange = () => {
    props.history.listen( (location, action) => {
      console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
      let new_filter_params = queryString.parse(location.hash)
      let new_url = filterUrlConstructor(new_filter_params.pe, new_filter_params.ou, new_filter_params.level, "http://0.0.0.0:3000/api/county/stockstatus/al")
      fetchAL(new_url)
    })
  }

  useEffect( () => {
    fetchAL(url)
    onUrlChange()
    console.log(`location == ${JSON.stringify(location)}`)
    getValidOUs().then(vo=>{
      let vFlS = JSON.parse( localStorage.getItem('validOUs') )
      if(vFlS && vFlS.length<1){
        setValidOUs(vo)
        // localStorage.removeItem('validOUs')
        console.log("refetching validOUs with getValidOUs")
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
