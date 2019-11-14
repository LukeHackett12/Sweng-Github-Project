import React, { Component } from "react";
import Typist from 'react-typist'
import TypistLoop from 'react-typist-loop'
import D3 from "./D3"
import "./Magic.css";

import { Row, Col } from 'react-bootstrap';

const imgStye = {
    borderRadius: "50%",
    width: "250px",
    height: "250px"
  };

class Profile extends Component {

    countOverTime(list){
        let listDates = [];
        list.forEach((eachitem) =>{
            listDates.push(eachitem.created_at.split('T')[0]);
        })

        listDates.sort();

        let sorted = []
        listDates.forEach((date, i) => {
            sorted.push({date: date, value: i+1})
        })

        return sorted;
    }

    collateEvents(events){
        let listDates = [];
        events.forEach((eachitem) =>{
            listDates.push(eachitem.created_at.split('T')[0]);
        })

        listDates.sort();

        let mapCount = [];
        listDates.forEach((eachitem) => {
            if(eachitem in mapCount){
                let count = mapCount[eachitem] + 1;
                delete mapCount[eachitem];
                mapCount[eachitem] = count;
            } else {
                mapCount[eachitem] = 1;
            }
        })

        return mapCount;
    }

    render() { 
        return (
            <Row className="show-grid d-flex flex-row">
              <Col xs={12} className="d-flex flex-column">
                <div className="d-flex flex-row">  
                    <div className="justify-content-left ml-5">
                        <div className="d-flex flex-column">
                        {this.props.avatar_url ?
                            <img src={this.props.avatar_url}
                                alt="Profile"
                                style={imgStye}/> : null }
                        </div>
                        <br/>
                        <div className="d-flex flex-column center">
                            {this.props.profile_url ? <div><p><a className="btn btn-info" href={this.props.profile_url} target="_blank">View on GitHub</a></p></div> : null }
                        </div>
                    </div>
                    <div className="d-flex justify-content-center bigWhite">
                        <div className="d-flex flex-column">
                            <TypistLoop interval={3000}>
                                {[
                                this.props.name
                                ].map(text => <Typist key={text} startDelay={1000}>{text}</Typist>)}
                            </TypistLoop>
                        </div>
                    </div>
                </div>
              </Col>
              <Col xs={12} md={3} className="card cardColor ml-4 shadow">
                <div className="card-body text-white">
                    <Col xs={12}>
                        <div>
                            <b>Starred</b>
                            {
                                Object.entries(this.props.starred.slice(0,12)).map(([key,eachitem]) =>
                                <div key={key}>
                                    <p><a href={eachitem.html_url}>{eachitem.full_name}</a> - {eachitem.description.substring(0, 50) + "..."}</p>
                                </div> ) 
                            }
                        </div>
                    </Col>
                </div>
              </Col>
              <Col className="card flex-column cardColor ml-2 shadow">
                <div className="card-body text-white">
                    <Col xs={12}>
                        <div>
                            <b><i>Visualizations</i></b>
                            <br/>
                            <D3 name={this.props.name}
                                repoDates={this.countOverTime(this.props.repos)}
                                following={this.props.following}
                                followers={this.props.followers}
                                events={this.collateEvents(this.props.events)}
                                />
                        </div>
                    </Col>
                </div>
              </Col>
            </Row>
        );
    }
}

export default Profile;
