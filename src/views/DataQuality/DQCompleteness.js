import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Toolbar, PieChart } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

const DQCompleteness = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  let dataa = {
    datasets: [{
      data: [10, 20, 30],
      backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"]
    }],
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ],
  };

  return (
    <div className={classes.root}>
      <Toolbar title="Data Quality: Completeness" />
      <div className={classes.content}>
        <PieChart data={dataa}/>
      </div>
    </div>
  );
};

export default DQCompleteness;
