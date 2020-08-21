import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Card, CardHeader, CardContent, CardActions, Divider, Button, Typography, CircularProgress } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
require('highcharts/modules/exporting')(Highcharts);


const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative',
    textAlign: 'center'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const MOSbyCommodity = props => {
  const { className, data, minmax, yminmax, labels, ...rest } = props;
  console.log('labels');
  console.log(labels);
  const theme = useTheme();
  // console.log(`theme: ${JSON.stringify(theme.palette.secondary, '', 1)}`)

  const options = {
    chart: {
      type: 'bar'
    },
    title: {
        text: 'MOS By Commodity'
    },
    // subtitle: {
    //     text: 'Source: HIS Kenya'
    // },
    colors: [theme.palette.secondary.light, theme.palette.secondary.main, theme.palette.secondary.dark],
    exporting: {
        enabled: true
    },
    xAxis: {						
        categories: labels, //['AL6', 'AL12', 'AL18', 'AL24', 'AL all', 'AS inj','SP tabs', 'RDTs'],
        title: {
            text: 'Commodity'
        }
    },
    yAxis: {
        min: yminmax[0],
        max: yminmax[1],
        title: {
            text: 'Months of Stock',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        plotLines: [{
            color: '#FF0000',
            width: 2,
            value: minmax[0],
            label: {
                text: 'Min',
                align: 'right'
            }
        },
        {
            color: '#00FF00',
            width: 2,
            value: minmax[1],
            label: {
                text: 'Max',
                align: 'right'
            }
        }]
    },
    tooltip: {
        valueSuffix: ' MOS'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Months Of Stock',
        data: data,
        
    }]
  }

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="MOS by commodity" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          { data.length != 8 ? (
            <div style={{padding: '3rem 1rem'}}>
              <CircularProgress color="secondary" />
            </div>
          ) : ( 
            <HighchartsReact highcharts={Highcharts} options={options} />
          ) }
        </div>
      </CardContent>
      {/* <Divider /> */}
    </Card>
  );
};

MOSbyCommodity.propTypes = {
  className: PropTypes.string
};

export default MOSbyCommodity;
