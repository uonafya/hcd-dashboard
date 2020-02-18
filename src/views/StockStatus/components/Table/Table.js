import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table as MTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { getInitials } from 'helpers';
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Table = props => {
  let { className, theads, rows, pageTitle, ...rest } = props;

  if(pageTitle == undefined || pageTitle == null ){
    pageTitle = ''
  }

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  
  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)} >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <MUIDataTable
              title={pageTitle} 
              data={rows} 
              columns={theads} 
              options={{selectableRows: false}} 
              rowsPerPage={rowsPerPage}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
      </CardActions>
    </Card>
  );
};

// Table.propTypes = {
//   className: PropTypes.string,
//   rows: PropTypes.array.isRequired
// };

export default Table;
