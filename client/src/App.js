import React from "react";
import Home from './routes/Home';
import Profile from './routes/Profile';
import cookie from 'react-cookies'
import Unity, { UnityContent } from "react-unity-webgl";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: "home" };

    this.unityContent = new UnityContent(
      "Build/game.json",
      "Build/UnityLoader.js"
    );
  }

  handleToUpdate = (s) => {
    this.setState( { screen: s } )
  }

  componentDidMount() {
    const code =
        window.location.href.match(/\?code=(.*)/) &&
        window.location.href.match(/\?code=(.*)/)[1];

    if (code) {
        this.setState( { screen : "profile" } )

        fetch("http://localhost:9000/githubApi/token?code=" + code)
            .then(res => res.text())
            .then(res => cookie.save('access_token', res.split('&')[0].match(/access_token=(.*)/)[1], { path: '/' }))
            .catch(err => err);
    }
  }

  render() {
    return (
      <div>
        {this.state.screen === "play" && (
          <Unity unityContent={this.unityContent} />
        )}
        {this.state.screen === "home" && (
          <Home />
        )}
        {this.state.screen === "profile" && (
          <Profile handleToUpdate={this.handleToUpdate} />
        )}
      </div>
    );
  }
}

export default App;
