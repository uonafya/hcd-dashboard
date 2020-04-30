import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Toolbar, Table } from './components';
import onTimeData from './rrontimedata';
import rrData from './rrdata';
import linegraph, { Linegraph } from './Linegraph';
import formatPeriods, { sortMetaData } from './constants';



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));


const RRSummary = () => {
 // const [onTimeData, setonTimeData] = useState([]);
  const  [rawrrData] = useState(rrData[0].rows);
  const [rawData] = useState(onTimeData[0].rows);
  const [sortedrrData, setsortedrrData] = useState([]);
  const [sortedData,setsortedData]=useState([]);
  const [periods]=useState(onTimeData[0].metaData.dimensions.pe)
  const [formatedPeriods,setformatedPeriods]=useState([])
  const classes = useStyles();
  const [finalData,setfinalData]=useState([]);
  const [finalrrData, setfinalrrData]=useState([]);

  console.log('kents',rawrrData)

  const mapData=()=>{
   let myData=[];
   let myrrData=[];
    sortedData.map((data)=>{
     myData=[...myData,parseFloat(data[2])];
    })
   
    return myData
  }

  const maprrData=()=>{
    let myrrData=[];
    sortedrrData.map((rrdata)=>{
      myrrData=[...myrrData,parseFloat(rrdata[2])];
    })
    return myrrData
  }

 

  useEffect(()=>{
    //let formatedPeriods=formatPeriods(periods)
   // console.log("Formated perioss",formatedPeriods)
   setformatedPeriods(formatPeriods(periods));
   setfinalData( mapData())
   setfinalrrData(maprrData())


  },[sortedData], [sortedrrData])

  useEffect(()=>{
    setsortedData(sortMetaData(rawData));
    setsortedrrData(sortMetaData(rawrrData));

  },[])

//  console.log(')



  return (
    <div className={classes.root}>
      <Toolbar title="Reporting Rate: Summary" />
      <div className={classes.content}>
        {
          finalData.length === 0 || finalData === 'undefined' || finalrrData === 'undefined' || finalrrData.length === 0 ?
          null:<Linegraph Periods={formatedPeriods} ontimeData={finalData} rrData={finalrrData} OTname = {'OnTime Report'} rrname = {'Reproting rate'}/>
        }
      </div>
    </div>
  );
};

export default RRSummary;
