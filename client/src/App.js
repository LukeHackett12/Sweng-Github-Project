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
                    avatar_url: null,
                    profile_url: null,
                    name: null,
                    repos : null,
                    events : null,
                    starred : null,
                    followers : null,
                    following : null,
                 };
  }

  handleToUpdate = (s) => {
    this.setState( { screen: s } )
  }

  async componentDidMount() {
    console.log(window.location.href);

    const code =
        window.location.href.match(/\?code=(.*)/) &&
        window.location.href.match(/\?code=(.*)/)[1];

    if (code) {
        this.setState({ screen : "loading" })

        await axios.get("http://localhost:9000/githubApi/token?code=" + code)
            .then(res => res.data)
            .then(res => res.split('&')[0])
            .then(res => cookie.save('access_token', res.match(/access_token=(.*)/)[1], { path: '/' }))
            .then(console.log(cookie.access_token))
            .catch(err => err);

        await axios.get("http://localhost:9000/githubApi/profileUpsert", {withCredentials: true})
        .then(res => {this.setState({ avatar_url: res.data.avatar_url,
                                      profile_url: res.data.profile_url,
                                      name: res.data.name,
                                      repos : res.data.repos,
                                      events : res.data.events,
                                      starred : res.data.starred,
                                      followers : res.data.followers,
                                      following : res.data.following,
                                      status: "finished", 
                                      screen : "profile" })})
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
          <Profile avatar_url={this.state.avatar_url} 
                  profile_url={this.state.profile_url}
                  name={this.state.name}
                  repos={this.state.repos}
                  events={this.state.events}
                  starred={this.state.starred}
                  followers={this.state.followers}
                  following={this.state.following}/>
        )}
      </div>
    );
  }
}

export default App;
