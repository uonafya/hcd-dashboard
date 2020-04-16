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
        console.log('kenya11111',this.props.Data)
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
                    text: 'Indicator Value'
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
              data: this.props.Data
            }]
          }
        }
      }

    componentDidMount(){
        
      // let fetchData = this.props.Data
      // this.setState({
      //   chartOptions: {
      //     series: [20,30,40]

      //   }
      // })
      //  fetchData.map(fetchData =>
      //   this.setState({
      //     chartOptions: {
      //       series: fetchData[2],
      //       categories: fetchData[1]
      //     }
      //   }))
        
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
