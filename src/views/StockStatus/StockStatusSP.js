import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Toolbar from './components/Toolbar/Toolbar';
import SPTable from './components/Table/SPTable';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

const StockStatusSP = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <Toolbar title="Stock Status: Sulphadoxine Pyrimethamine" />
      <div className={classes.content}>
        <SPTable users={users} />
      </div>
    </div>
  );
};

export default StockStatusSP;
