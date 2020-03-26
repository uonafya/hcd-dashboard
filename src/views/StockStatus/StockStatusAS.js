import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Toolbar from './components/Toolbar/Toolbar';
import ASTable from './components/Table/ALTable';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

const StockStatusAS = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <Toolbar title="Stock Status: Artesunate Injection" />
      <div className={classes.content}>
        <ASTable users={users} />
      </div>
    </div>
  );
};

export default StockStatusAS;
