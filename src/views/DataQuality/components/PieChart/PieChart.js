import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
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

const PieChart = props => {
  const { className, data, period, ...rest } = props;
  const theme = useTheme();
  const options = {
    chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie'
	},
    title: {
      text: 'Opening SOH vs Closing SOH comparison'
    },
    subtitle: {
      text: data.subtitle || ''
    },
    credits: {
      enabled: false
    },
    exporting: {
		enabled: true,
    //   buttons: {
    //     contextButton: {
    //       menuItems: ['downloadPNG', 'downloadSVG', 'separator', 'label']
    //     }
    //   }
	},
	tooltip: {
		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
    legend: {
      layout: 'vertical',
      align: 'center',
      verticalAlign: 'bottom'
    },

    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      },
      series: {
        label: {
          connectorAllowed: false
        }
	  },
	  pie: {
                            
		allowPointSelect: true,
		colors: ['#7bd48d','#ffc7ce'],
		cursor: 'pointer',
		dataLabels: {
			enabled: true
		},
		showInLegend: true
	  }
    },
    series: [{
		name: 'Percentage',
		colorByPoint: true,
		valueDecimals: 2,
		data: [{
			name: `Opening SOH (${data.month2}) = Closing SOH (${data.month1})`,
			y: data.eq
		}, {
			name: `Opening SOH (${data.month2}) ≠ Closing SOH (${data.month1})`,
			y: data.n_eq
		}]
	}],
    colors: ['#92d050', '#c55a11', '#8497b0'],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }
      ]
    }
  };

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="National Summary" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          {data.length < 1 ? (
            <div style={{ padding: '3rem 1rem' }}>
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <HighchartsReact highcharts={Highcharts} options={options} />
          )}
        </div>
      </CardContent>
      {/* <Divider /> */}
    </Card>
  );
};

export default PieChart;
