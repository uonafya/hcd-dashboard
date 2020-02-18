import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Toolbar, Table } from './components';
import mockData from './data';
import data from 'views/Dashboard/components/LatestOrders/data';

import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

const StockStatusAL = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  let data = {}
  data.theads = [
    "Name",
    "Email",
    "Location",
    "Phone",
    "Registration date"
  ]
  data.rows = []
  users.map(usr=>{
    let datarow = []
    datarow.push(usr.name)
    datarow.push(usr.email)
    datarow.push(`${usr.address.city}, ${usr.address.state}, ${usr.address.country}`)
    datarow.push(usr.phone)
    datarow.push(moment(usr.createdAt).format('DD/MM/YYYY'))
    data.rows.push(datarow)
  })

  return (
    <div className={classes.root}>
      <Toolbar title="Stock Status: Artemether Lumefantrine" />
      <div className={classes.content}>
        <Table users={users} theads={data.theads} rows={data.rows}/>
      </div>
    </div>
  );
};

export default StockStatusAL;
