import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Toolbar, Table } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

const SCSummary = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <Toolbar title="Supply Chain Performance: Summary" />
      <div className={classes.content}>
        <Table users={users} />
      </div>
    </div>
  );
};

export default SCSummary;
