import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import registerServiceWorker from './registerServiceWorker';

/*
const routing = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/play" component={Play} />
    </Switch>
  </BrowserRouter>
)
*/

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker();
