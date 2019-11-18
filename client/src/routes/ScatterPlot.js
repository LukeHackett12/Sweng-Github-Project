import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class ScatterPlot extends Component {

  render() {

    let xs= [];
    let ys= [];

    console.log(this.props.data);

    Object.entries(this.props.data).forEach(([key, value]) => {
        xs.push(key);
        ys.push(value);
    });

    return (
      <Plot
        data={[
          {
            x: xs,
            y: ys,
            mode: 'markers',
            marker:{size:ys.map(value => { return value*4} ),
                   color:xs},
            style: {color:'white'}
          },
        ]}
        layout={ {width: this.props.elementWidth, height: this.props.elementHeight, 
                title: 'Recent Activity', 
                xaxis: {title: 'Date', showgrid: false,zeroline: false,showline: false}, 
                yaxis: {title: 'No. Events', showgrid: false,zeroline: false,showline: false}, 
                font: {color:'white'}, 
                paper_bgcolor : 'rgba(0,0,0,0)', 
                plot_bgcolor : 'rgba(0,0,0,0)'} }
      />
    );
  }
}

export default ScatterPlot;