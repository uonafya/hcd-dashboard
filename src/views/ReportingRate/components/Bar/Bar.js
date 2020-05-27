import React, { useState } from 'react';
import clsx from 'clsx';
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
  TablePagination,
  Snackbar,
  Grid
} from '@material-ui/core';

import { getInitials } from 'helpers';
import MUIDataTable from 'mui-datatables';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);

// if (typeof Highcharts === 'object') {
//   HighchartsExporting(Highcharts);
// }

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    // minWidth: 1050
    padding: '12px',
    minWidth: '100%'
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end',
    padding: '0px'
  }
}));

const Bar = props => {
  let { className, scrr_subcounties, scrr_rate, loading, ...rest } = props;

  const classes = useStyles();

  const chartOptions = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Latest Reporting Rate by Sub-County'
    },

    subtitle: {
      text: ''
    },

    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Reporting Rate (%)',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      borderWidth: 0
    },
    xAxis: {
      title: {
        text: 'Reporting Rate (%)'
      },
      categories: scrr_subcounties
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      {
        name: 'Sub-County Reporting Rate',
        data: scrr_rate
      }
    ]
  };

  return (
    <Grid lg={4} md={4} item>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardContent className={classes.content}>
          <div className={classes.inner}>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Bar;
