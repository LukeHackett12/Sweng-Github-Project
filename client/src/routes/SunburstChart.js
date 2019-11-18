import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class ScatterPlot extends Component {
  render() {

    let followers = this.props.followers.map(e => {return e.login});
    followers.unshift(this.props.name);
    //let following = this.props.following.map(e => {return e.login});

    let nameArray = [];
    nameArray.push("");

    while(nameArray.length < followers.length){
        nameArray.push(this.props.name);
    }

    return (
      <Plot
        data={[
          {
            type: "sunburst",
            labels: followers,
            parents: nameArray,
            outsidetextfont: {size: 20, color: "white"},
            leaf: {opacity: 0.4},
            marker: {line: {width: 2}},
          },
        ]}
        layout={ {width: this.props.elementWidth, height: this.props.elementHeight, 
                title: 'Followers', 
                xaxis: {showgrid: false,zeroline: false,showline: false}, 
                yaxis: {showgrid: false,zeroline: false,showline: false}, 
                font: {color:'white'}, 
                paper_bgcolor : 'rgba(0,0,0,0)', 
                plot_bgcolor : 'rgba(0,0,0,0)'} }
      />
    );
  }
}

export default ScatterPlot;