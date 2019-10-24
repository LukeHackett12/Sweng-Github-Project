import React, { Component } from "react";
import logo from "./logo.svg";
import { OauthSender } from 'react-oauth-flow';
import { Button } from 'react-bootstrap';
import "./App.css";

import {STATUS} from "gitstar-components";

const fetch = require('node-fetch');

class App extends Component {

    state = {
        status: STATUS.INITIAL,
        access_token: null,
        repositories: null
    };

    getRepos(){
        fetch("http://localhost:9000/githubApi/repos?access_token=" + this.state.access_token)
                .then(res => res.text())
                .then(res => this.setState({ repositories: res }))
                .catch(err => err);
    }

    componentDidMount() {
        const code =
          window.location.href.match(/\?code=(.*)/) &&
          window.location.href.match(/\?code=(.*)/)[1];
        console.log(code);

        if (code) {
            this.setState({ status: STATUS.LOADING });
            fetch("http://localhost:9000/githubApi/token?code=" + code)
                .then(res => res.text())
                .then(res => this.setState({ access_token: res.split('&')[0].match(/access_token=(.*)/)[1]}))
                .catch(err => err);
        }
      }

    render() {
        require('dotenv').config({ path: 'secrets.env' })

        var redirect = process.env.REACT_APP_BASE_URL + ":" + process.env.REACT_APP_PORT + "/auth/github/callback";

        let list
        if(this.state.repositories === null){
            list = <ul></ul>
        }
        else {
            list = 
            <ul>
                {
                    JSON.parse(this.state.repositories).map((item, key) => {
                        return <li key={key}>{item.name} {item.url}</li>
                    })
                }
            </ul>
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <OauthSender
                    authorizeUrl="https://www.github.com/login/oauth/authorize"
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    redirectUri={redirect}
                    render={({ url }) => <Button href={url}>Connect to Github</Button>}
                />
                <p className="App-intro">{this.state.access_token}</p>
                <div>
                    <Button onClick={this.getRepos()}>Get repositories</Button>
                    {list}
                </div>
            </div>
        );
    }
}

export default App;
