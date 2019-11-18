import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class LineChart extends Component {

  render() {
    return (
      <Plot
        data={[
          {
            x: this.props.data.map(e => {
              return e.date
            }),
            y: this.props.data.map(e => {
              return e.value
            }),
            type: 'scatter',
            marker: {color: 'blue'},
            style: {color:'white'}
          },
        ]}
        layout={ {width: this.props.elementWidth, height: this.props.elementHeight, 
                title: 'Repositories Created Over Time', 
                xaxis: {showgrid: false,zeroline: false,showline: false}, 
                yaxis: {showgrid: false,zeroline: false,showline: false}, 
                font: {color:'white'}, 
                paper_bgcolor : 'rgba(0,0,0,0)', 
                plot_bgcolor : 'rgba(0,0,0,0)'} }
      />
    );
  }
}

export default LineChart;