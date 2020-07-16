import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

const DQConcordance = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
      </div>
    </div>
  );
};

export default DQConcordance;
