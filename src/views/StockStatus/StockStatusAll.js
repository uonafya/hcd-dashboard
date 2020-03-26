import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Toolbar from './components/Toolbar/Toolbar';
import AllTable from './components/Table/AllTable';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

const StockStatusAll = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <Toolbar title="Stock Status: All Commodities" />
      <div className={classes.content}>
        <AllTable users={users} />
      </div>
    </div>
  );
};

export default StockStatusAll;
