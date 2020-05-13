import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Select, MenuItem, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import {filterUrlConstructor, getValidOUs} from '../../common/utils'
import {endpoints} from 'hcd-config'

import Toolbar from 'components/Toolbar/Toolbar';
import ALTable from './components/Table/ALTable';
const abortRequests = new AbortController();

const ss_pages = endpoints.filter(ep=>ep.page=="Stock status")

const queryString = require('query-string');
const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing(3), },
  content: { marginTop: theme.spacing(1) },
  gridchild: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));


const StockStatusAL = props => {
  const classes = useStyles();
  
  // ------pages-------
  const [spages, setSSPages] = useState([['Loading...']]);
  // ------pages-------
  let filter_params = queryString.parse(props.location.hash)
  let [url, setUrl] = useState( filterUrlConstructor(filter_params.pe, filter_params.ou, filter_params.level, "http://41.89.94.99:3000/api/county/stockstatus/al") )
  const [sdata, setSSData] = useState([['Loading...']]);
  const [prd, setPrd] = useState(null);
  const [validOUs, setValidOUs] = useState(
    JSON.parse( localStorage.getItem('validOUs') )
  );
  const [oun, setOun] = useState(null);
  const [hds, setHds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  const [err, setErr] = useState({error: false, msg: ''});
  let title = `Stock Status`

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
		fetch(the_url, {signal: abortRequests.signal}).then(ad=>ad.json()).then(reply=>{
			if(reply.fetchedData.error){
				setErr( {error: true, msg: reply.fetchedData.message,...reply.fetchedData} );
			}else{
				setErr( {error: false, msg: ''} );
				//check if error here
				let rows_data = []
				const rows = reply.fetchedData.rows
				let all_ous = []

				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
				setHds([])
				const heds = []
				reply.fetchedData.metaData.dimensions.dx.map((dxh, indxh) => {
					heds.push(reply.fetchedData.metaData.items[dxh].name)
				})
				setHds(heds)
				// console.log(`heads: ${JSON.stringify(hds)}`);
				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
				reply.fetchedData.metaData.dimensions.ou.map((o_ou, ix) => {
					if(validOUs && validOUs.includes(o_ou) && rows.length>0){
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
			}
			setLoading(false)
		}).catch(err=>{
			setLoading(false)
			setErr({error: true, msg: 'Error fetching data', ...err})
		})
    } catch (er) {
      setErr({error: true, msg: 'Error fetching data'})
    }
  }

  const onUrlChange = (base_url) => {
    props.history.listen( (location, action) => {
      let new_filter_params = queryString.parse(location.hash)
      if(new_filter_params.pe != '~' && new_filter_params.pe != '' && new_filter_params.pe != null){setPrd(new_filter_params.pe)}
      if(new_filter_params.ou != '~' && new_filter_params.ou != '' && new_filter_params.ou != null){setOun(new_filter_params.ou)}
      if(new_filter_params.level != '~' && new_filter_params.level != '' && new_filter_params.level != null){setOulvl(new_filter_params.level)}
      let new_url = filterUrlConstructor(new_filter_params.pe, new_filter_params.ou, new_filter_params.level, base_url)
      fetchAL(new_url)
    })
  }

  useEffect( () => {
    fetchAL(url)
    onUrlChange("http://41.89.94.99:3000/api/county/stockstatus/al")
    getValidOUs().then(vo=>{
      let vFlS = JSON.parse( localStorage.getItem('validOUs') )
      if(vFlS && vFlS.length<1){
        setValidOUs(vo)
        // localStorage.removeItem('validOUs')
        // console.log("refetching validOUs with getValidOUs")
        // localStorage.setItem('validOUs', JSON.stringify(vo))
      }
    })

    return () => {
      console.log(`SS:AL: aborting requests...`);
      abortRequests.abort()
    }
  }, [])

  let data = {}
  data.theads = [ "Name", "MFL Code" ]
  data.theads = [...data.theads, ...hds]
  data.rows = sdata


  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          {err.error ? (
            <></>
          ) : (
            <Select className={classes.gridchild, "text-bold p-0"} variant="outlined" autoWidth={true} style={{fontSize: '1rem'}} defaultValue={ss_pages[0].local_url}
            onChange={(chp)=>{
              fetchAL(filterUrlConstructor(filter_params.pe, filter_params.ou, filter_params.level, chp.target.value))
            }}
            >
              {ss_pages.map((sp,kyy)=>{
                return (<MenuItem key={kyy} className="text-bold" value={sp.local_url}>{sp.name}</MenuItem>)
              })}
            </Select>
          )}
        </Grid>
        <Grid item xs={12} sm={9}>
          <Toolbar className={classes.gridchild} title={title} pe={prd} ou={oun} lvl={oulvl} filters={[]} />
        </Grid>
      </Grid>
      <div className={classes.content}>
        {err.error ? (
          <Alert severity="error">{err.msg}</Alert>
        ) : (
          <ALTable pageTitle={title} theads={data.theads} rows={data.rows} loading={loading}/>
        )}
      </div>
    </div>
  );
};

export default StockStatusAL;
