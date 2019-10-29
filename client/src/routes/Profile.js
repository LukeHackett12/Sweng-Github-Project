import React, { Component } from "react";
import JSONPretty from 'react-json-pretty';
import axios from 'axios';
import {STATUS} from "gitstar-components";

import "./Profile.css";


class Profile extends Component {

    state = {
        access_token: null,
        repositories: null,
        profile: null,
        status: STATUS.INITIAL,
    };

    upsertProfile(){
        this.setState({status : STATUS.LOADING});

        axios.get("http://localhost:9000/githubApi/profileUpsert?access_token=" + this.state.access_token)
                .then(res => {this.setState({ profile: res.data, status: STATUS.FINISHED_LOADING })})
                .catch(err => err);
    }

    componentDidMount() {
        const code =
            window.location.href.match(/\?code=(.*)/) &&
            window.location.href.match(/\?code=(.*)/)[1];
        console.log(code);

        if (code) {
            fetch("http://localhost:9000/githubApi/token?code=" + code)
                .then(res => res.text())
                .then(res => this.setState({ access_token: res.split('&')[0].match(/access_token=(.*)/)[1]}))
                .catch(err => err);
        }
    }

    /*
    repos : repos.length, //Attack
    events : events.length, //Agility
    starred : starred.length, //Health
    followers : followers.length, //---¬
    following : following.length}; //-----Armor
    */

    render() {
        let button;
        if(STATUS.INITIAL === this.state.status){
            button = 
            <button class="btn btn-dark" type="button" onClick={() => this.upsertProfile()}>
            Generate Profile
          </button>
        } 
        else if(STATUS.LOADING === this.state.status){
            button = 
            <button class="btn btn-dark" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
        } 
        else {
            button = <p></p>;
        }

        return (
            <div className="Profile">
                <div className="Profile-body">
                    {button}
                    <JSONPretty id="json-pretty" data={this.state.profile} className="Profile-data"></JSONPretty>
                </div>
            </div>
        );
    }
}

export default Profile;
