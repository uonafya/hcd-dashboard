import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Toolbar from './components/Toolbar/Toolbar';
import RDTTable from './components/Table/RDTTable';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

const StockStatusRDT = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <Toolbar title="Stock Status: Rapid Diagnostic Tests" />
      <div className={classes.content}>
        <RDTTable users={users} />
      </div>
    </div>
  );
};

export default StockStatusRDT;
