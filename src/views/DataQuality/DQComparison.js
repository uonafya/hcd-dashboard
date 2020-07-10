import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

const DQComparison = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  let dataa = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July"
    ],
    datasets: [
      {
        label: "My First dataset",
        data: [
          1592,
          300,
          4247,
          4259,
          1360,
          1669,
          1799
        ],
        fill: false,
        borderDash: [5, 5]
      }, {
        hidden: true,
        label: 'hidden dataset',
        data: [
          3921,
          2158,
          1529,
          1437,
          3584,
          646,
          1726
        ]
      }, {
        label: "My Second dataset",
        data: [
          911,
          1208,
          1389,
          987,
          2207,
          4143,
          878
        ]
      }
    ]
  }



  return (
    <div className={classes.root}>
      <div className={classes.content}>
        
      </div>
    </div>
  );
};

export default DQComparison;
