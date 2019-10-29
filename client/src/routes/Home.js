import React, { Component } from "react";
import logo from "../Octocat/Octocat.svg";
import { GithubLoginButton } from "react-social-login-buttons";
import "./Home.css";
import "../index.css";

class Home extends Component {

    clickOauth(){
        var redirect = process.env.REACT_APP_BASE_URL + ":" + process.env.REACT_APP_PORT + "/profile";
        window.location.href="https://www.github.com/login/oauth/authorize?redirect_uri=" + redirect + "&client_id=" + process.env.REACT_APP_CLIENT_ID;
    }

    render() { 
        require('dotenv').config({ path: 'secrets.env' })
        return (
            <div className="Home body index-body">
                <h2 className="Home-header">Github Warrior</h2>
                <div className="Home-title">
                    <img src={logo} className="Home-logo" alt="logo" />
                    <GithubLoginButton onClick={() => this.clickOauth()}/>
                </div>
            </div>
        );
    }
}

export default Home;
