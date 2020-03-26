import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card, CardActions, CardContent, Avatar, Checkbox, Table as MTable, TableBody, TableCell, TableHead, TableRow, Typography, TablePagination, Snackbar
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

const ALTable = props => {
  let { className, theads, rows, loading, pageTitle, ...rest } = props;

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
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center', }} open={loading} autoHideDuration={90000} message="Loading..." />
          <div className={classes.inner}>
            <MUIDataTable
              title={pageTitle} 
              data={rows} 
              columns={theads} 
              options={{
                selectableRows: false,
                customRowRender: (datae, ky) => {
                  return (
                    <tr key={ky} className="MuiTableRow-root MUIDataTableBodyRow-root-345 MUIDataTableBodyRow-hover-346 MUIDataTableBodyRow-responsiveStacked-348 MuiTableRow-hover">
                      {datae.map((one_r, inx)=>(
                        <td key={inx} className="MuiTableCell-root MuiTableCell-body MUIDataTableBodyCell-root-349 MUIDataTableBodyCell-stackedCommon-351 MUIDataTableBodyCell-responsiveStackedSmall-353" style={{ backgroundColor: "aliceblue", color: '#111111', fontWeight: 'semibold'}}> {one_r} </td>
                      ))}
                    </tr>
                  );
                }
              }} 
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

export default ALTable;
