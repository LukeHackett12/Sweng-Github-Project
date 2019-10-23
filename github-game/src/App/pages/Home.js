import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Button variant="dark" href="/auth/github">Login With Github</Button>
      </div>
    );
  }
}
export default Home;
