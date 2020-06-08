import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Toolbar } from './components';
import mockData from './data';
import Table from './components/Table/Table';
import { StockedDataContext } from 'contexts/StockedData';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

const HFoverstocked = () => {
  const classes = useStyles();
  const { allrows, dx, orgid, tableData, org_units, rawData } = useContext(
    StockedDataContext
  );
  const [isUnderStock, setIsUnderStock] = useState(false);

  return (
    <div className={classes.root}>
      <Toolbar title="Health Facility follow-up : Overstocked facilities" />
      <div className={classes.content}>
        <Table
          isUnderStock={isUnderStock}
          dx={dx}
          orgid={orgid}
          allrows={allrows}
          rawData={rawData}
          tableData={tableData}
          org_unit={org_units}
        />
      </div>
    </div>
  );
};
export default HFoverstocked;
