import React, { Component } from "react";
import JSONPretty from 'react-json-pretty';
import cookie from 'react-cookies'
import "./Profile.css";

const axios = require('axios').create({ withCredentials: true });

class Profile extends Component {
    state = {
        profile: null,
        status: "initial",
    };

    startGame(){
        this.props.history.push("play/");
    }

    upsertProfile(){
        this.setState({status : "loading"});

        axios.get("http://localhost:9000/githubApi/profileUpsert", {withCredentials: true})
                .then(res => {this.setState({ profile: res.data, status: "finished" })})
                .then(() => {this.startGame()})
                .catch(err => err);
    }

    componentDidMount() {
        const code =
            window.location.href.match(/\?code=(.*)/) &&
            window.location.href.match(/\?code=(.*)/)[1];
        if (code) {
            fetch("http://localhost:9000/githubApi/token?code=" + code)
                .then(res => res.text())
                .then(res => cookie.save('access_token', res.split('&')[0].match(/access_token=(.*)/)[1], { path: '/' }))
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
        if("initial" === this.state.status){
            button = 
            <button className="btn btn-dark" type="button" onClick={() => this.upsertProfile()}>
            Generate Profile
          </button>
        } 
        else if("loading" === this.state.status){
            button = 
            <button className="btn btn-dark" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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
