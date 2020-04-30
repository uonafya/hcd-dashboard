import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
  }



export class Linegraph extends Component {
    constructor(props){
        super(props);
        this.state = {
          chartOptions: {
            chart: {
                    type: 'line'  // can be line, bar or column
                    },
            title: {
              text: ''
            },
    
            subtitle: {
                text: ''
            },
    
            yAxis: {
                title: {
                    text: '% Reporting Rate'
                }
            },
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              borderWidth: 0
            },
            xAxis: {
                categories: this.props.Periods
            },
            credits: {
              enabled: false
            },
            series: [{
              name: this.props.OTname,
              data: this.props.ontimeData,
              tooltip: {
                valueDecimals: 1
            }},{
              name: this.props.rrname,
              data: this.props.rrData,
              tooltip: {
                valueDecimals: 1
            }

            }]
          }
        }
      }
 

    render() {
        return (
            <div>
              <HighchartsReact highcharts = { Highcharts } options = {this.state.chartOptions}/>
            </div>
        )
    }
}

export default Linegraph
