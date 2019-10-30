import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './routes/Home';
import Profile from './routes/Profile';
import Play from './routes/Play';
import registerServiceWorker from './registerServiceWorker';

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";


const routing = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/play" component={Play} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'))

registerServiceWorker();
