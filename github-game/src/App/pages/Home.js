import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Button variant="dark" href="https://github.com/login/oauth/authorize?client_id=4624130b0edc83c140cc&redirect_uri=http://localhost:5000/oauth/redirect">Login With Github</Button>
      </div>
    );
  }
}
export default Home;
