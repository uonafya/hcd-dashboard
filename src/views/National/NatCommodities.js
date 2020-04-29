import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Toolbar from 'components/Toolbar/Toolbar';
import { DashStockStatus } from 'views/Dashboard/components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

const NatSummary = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar title={"National: All Commodities"} pe={"prd"} ou={"oun"} lvl={null} />
      <div className={classes.content}>
        {/* <DashStockStatus /> */}
        <DashStockStatus />
      </div>
    </div>
  );
};

export default NatSummary;
