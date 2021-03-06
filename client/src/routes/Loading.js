import React, { Component } from "react";
import logo from "../Octocat/Octocat.svg";
import "./Home.css";
import "./Loading.css";

class Loading extends Component {

    clickOauth(){
        var redirect = process.env.REACT_APP_BASE_URL + ":" + process.env.REACT_APP_PORT + "/";
        window.location.href="https://www.github.com/login/oauth/authorize?redirect_uri=" + redirect + "&client_id=" + process.env.REACT_APP_CLIENT_ID;
    }

    render() { 
            return (
            <div className="Home">
                <h2 className="Home-header">Github Warrior</h2>
                <div className="Home-title">
                    <img src={logo} className="Loading-logo" alt="logo" />
                    <div>Loading...</div>
                </div>
            </div>
        );
    }
}

export default Loading;
