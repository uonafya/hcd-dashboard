import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Toolbar, Table } from './components';
import mockData from './data';
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
 // const [mockData, setmockData] = useState([]);
  const [rawData, setrawData] = useState(mockData[0].rows);
  const [sortedData,setsortedData]=useState([]);
  const [periods]=useState(mockData[0].metaData.dimensions.pe)
  const [formatedPeriods,setformatedPeriods]=useState([])
  const classes = useStyles();
  const [finalData,setfinalData]=useState([]);

  console.log(mockData)

  const mapData=()=>{
   let myData=[];
    sortedData.map((data)=>{
     myData=[...myData,parseInt(data[2])];
    // console.log('kenyaa',myData)
   //setFinalData(myData2);
    //  console.log("cvid",finalData)
    //return myData;

    })
    return myData

  }


 

  useEffect(()=>{
    //let formatedPeriods=formatPeriods(periods)
   // console.log("Formated perioss",formatedPeriods)
   setformatedPeriods(formatPeriods(periods));
   setfinalData( mapData())

  },[sortedData])

  useEffect(()=>{
    setsortedData(sortMetaData(rawData));

  },[])

//  console.log(')



  return (
    <div className={classes.root}>
      <Toolbar title="Reporting Rate: Summary" />
      <div className={classes.content}>
        {
          finalData.length === 0 || finalData === 'undefined'?
          null:<Linegraph Periods={formatedPeriods} Data={finalData} />
        }
      </div>
    </div>
  );
};

export default RRSummary;
