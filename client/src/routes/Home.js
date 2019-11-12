import React, { Component } from "react";
import logo from "../Octocat/Octocat.svg";
import { GithubLoginButton } from "react-social-login-buttons";
import "./Home.css";

class Home extends Component {

    clickOauth(){
        var redirect = process.env.REACT_APP_BASE_URL + ":" + process.env.REACT_APP_PORT + "/";
        console.log("https://www.github.com/login/oauth/authorize?redirect_uri=" + redirect + "&client_id=" + process.env.REACT_APP_CLIENT_ID);
        window.location.href="https://www.github.com/login/oauth/authorize?redirect_uri=" + redirect + "&client_id=" + process.env.REACT_APP_CLIENT_ID;
    }

    render() { 
            return (
            <div className="Home">
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
