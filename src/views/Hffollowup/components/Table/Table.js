import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table as MTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

function Table(props) {
  const {
    org_unit,
    tableData,
    allrows,
    rawData,
    orgid,
    dx,
    isUnderStock
  } = props;
  const MOS = dx[0];
  const Overstocked = dx[2];
  const ActualStock = dx[1];
  const classes = useStyles();


  const getAllMOS = (orgid) => {
    return allrows
      .filter(row => {
        return row[0] === MOS;
      })
      .filter(row2 => {
        return row2[1] === orgid;
      })
      .filter(row4 => {
        if (isUnderStock === true) {
          return row4[3] > 0 && row4[3] < 3;
        } else {
          return row4[3] > 6;
        }
      })

      .map(data => {
        return data[3];
      });
  };

  const getAllOverStocked = (orgid) => {
    return allrows
      .filter(row => {
        return row[0] === Overstocked;
      })
      .filter(row2 => {
        return row2[1] === orgid;
      })
      

      .map(data => {
        //console.log("dataaaa",data[3])
        return data[3];
      });
  };

  const getAllActualStock = (orgid, dataset) => {
    return allrows
      .filter(row => {
        return row[0] === ActualStock;
      })
      .filter(row2 => {
        return row2[1] === orgid;
      })

      .map(data => {
        return data[3];
      });
  };

  const getOrgName = ouId => {
    return rawData.metaData.items[ouId].name;
  };

  const OverstockedFn = (data1, data2, data3) => {
    let mos = parseFloat(data1);
    let overstock = parseFloat(data2);
    let actual = parseFloat(data3);
    if (mos === '' || overstock === '' || actual === '') {
      return 'NIL';
    } else if (isUnderStock === true) {
      let var1 = (3 / mos) * actual;
      let var2 = var1 - actual;
      var2 = Math.round(var2 * 10) / 10;
      return var2;
    } else if (isUnderStock === false) {
      let var1 = (6 / mos) * actual;
      let var2 = actual - var1;
      var2 = Math.round(var2 * 10) / 10;
      return var2;
    }

  };


  const countOu=(ou)=>{
    //let count=0
   return allrows.filter((v) => (v[1] === ou));
    
  
  }


  return (
    <div>
     
      {allrows.length === 0 || allrows === 'undefined' || orgid.length === 0 || orgid === 'undefined'? (
        <div style={{ padding: 10 }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>
          <MTable className="slimtable">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>MOS</TableCell>
                {isUnderStock ?
                <TableCell>Understocked AMC</TableCell>:
                <TableCell>Overstocked AMC</TableCell>}
                <TableCell>Actual stock</TableCell>
                {isUnderStock ?
                <TableCell>Understocked by</TableCell>:
                <TableCell>Overstocked by</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {orgid.map(ou => {

               let myCount =countOu(ou);

               if(myCount.length === 3){
               let myCount1=myCount[0][1]
               console.log(myCount[0][1])
               console.log('kkk',myCount)
                 return (
                  <TableRow className="tr">
                    <TableCell className="td">
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">
                          {getOrgName(myCount1)} - {ou}
                        </Typography>
                      </div>
                    </TableCell>

                    <TableCell className="td">MFL code</TableCell>
                   
                      <TableCell className="td">
                       {getAllMOS(myCount1)}
                      </TableCell>
                   

                    <TableCell className="td">
                      {getAllOverStocked(myCount1)}
                    </TableCell>

                    <TableCell className="td">
                      {getAllActualStock(myCount1)}
                    </TableCell>

                    <TableCell className="td">
                      {OverstockedFn(
                        getAllMOS(myCount1),
                        getAllOverStocked(myCount1),
                        getAllActualStock(myCount1)
                      )}
                    </TableCell>
                  </TableRow>
                )
           

               }
               else if(countOu === 2){
                 return null;
               }
               


              })}
            </TableBody>
          </MTable>
        
        </div>
      )}
    </div>
  );
}

export default Table;
