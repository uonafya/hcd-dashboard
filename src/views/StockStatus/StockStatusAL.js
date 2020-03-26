import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import {filterUrlConstructor} from '../../common/utils'

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
  console.log(url)
  const [sdata, setSSData] = useState([['Loading...']]);
  const [prd, setPrd] = useState('');
  const [oun, setOun] = useState('');
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState('');
  const [err, setErr] = useState({error: false, msg: ''});
  // let title = `Stock Status: Artemether Lumefantrine. ${prd==""||prd==null?"":" - "+prd+", "}${oun==""||oun==null?"":oun}`
  let title = `Stock Status: Artemether Lumefantrine.`

  const updateData = (rws, priod, ogu, levl) => {
    setSSData(rws)
    setPrd(priod)
    setOun(ogu)
    setOulvl(levl)
  }

  useEffect( () => {
    let fetchAL = async ()=>{
      setLoading(true)
      setSSData([['Loading...']])
      try {
        fetch(url).then(ad=>ad.json()).then(reply=>{
          //check if error here
          updateData(reply.fetchedData.rows, reply.fetchedData.period, reply.fetchedData.ou, reply.fetchedData.lvl)
          setLoading(false)
        })
      } catch (er) {
        setErr({error: true, msg: 'Error fetching data'})
      }
    }
    fetchAL()
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
