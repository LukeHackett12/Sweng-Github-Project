import React, { Component } from 'react'

import LineChart from "./LineChart"
import ScatterPlot from './ScatterPlot';
import SunburstChart from './SunburstChart';

import './Magic.css'

class D3 extends Component {
   render(){
      return(
         <div className="d-flex">
            <div className="d-flex flex-column">
               <div className="d-flex flex-row">
                  <LineChart elementWidth={700} elementHeight={500} data={this.props.repoDates}/>
               </div>
               <div className="d-flex flex-row">
                  <ScatterPlot elementWidth={700} elementHeight={500} data={this.props.events}/>
               </div>
            </div>
            <div className="d-flex flex-column">
            <div className="d-flex flex-row justify-content-center justCent">
                  <SunburstChart elementWidth={800} elementHeight={800} name={this.props.name} followers={this.props.followers} following={this.props.following}/>
               </div>
            </div>
         </div>
      );
   }
}
export default D3
