import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './routes/Home';
import Profile from './routes/Profile';
import registerServiceWorker from './registerServiceWorker';

import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";


  const routing = (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
      </div>
    </Router>
  )
  
  ReactDOM.render(routing, document.getElementById('root'))

registerServiceWorker();
