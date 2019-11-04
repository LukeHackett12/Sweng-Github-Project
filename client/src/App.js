import React from "react";
import Home from './routes/Home';
import Loading from './routes/Loading';
import Profile from './routes/Profile';
import cookie from 'react-cookies'

const axios = require('axios').create({ withCredentials: true });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: "home",
                    profile: null,
                    repos: null
                 };
  }

  handleToUpdate = (s) => {
    this.setState( { screen: s } )
  }

  componentDidMount() {
    const code =
        window.location.href.match(/\?code=(.*)/) &&
        window.location.href.match(/\?code=(.*)/)[1];

    if (code) {
        this.setState({ screen : "loading" })

        axios.get("http://localhost:9000/githubApi/token?code=" + code)
            .then(res => res.text())
            .then(res => cookie.save('access_token', res.split('&')[0].match(/access_token=(.*)/)[1], { path: '/' }))
            .catch(err => err);

        axios.get("http://localhost:9000/githubApi/profileUpsert", {withCredentials: true})
        .then(res => {this.setState({ profile: res.data.followers, repos: res.data.repos, status: "finished" })})
        .then(() => {this.setState({ screen : "profile" })})
        .catch(err => err);
    }
  }

  render() {
    return (
      <div>
        {this.state.screen === "home" && (
          <Home />
        )}
        {this.state.screen === "loading" && (
          <Loading />
        )}
        {this.state.screen === "profile" && (
          <Profile profile={this.state.profile} repos={this.state.repos}/>
        )}
      </div>
    );
  }
}

export default App;
