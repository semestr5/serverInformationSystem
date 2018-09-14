import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import {hashHistory, Route ,Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import routes from './router';

import configureStore from './zConfigureApp/configureStore';

import SubScreen from './views/SubScreen/SubScreen';
import SecondScreen from './views/SecondScreen/SecondScreen';

const store = configureStore();
// const history = syncHistoryWithStore(browserHistory, store);

//
class ScreenManager extends React.Component {
  
render() {
  return (
            <Provider store={store}>
                <Router>
                  {routes}
                </Router>
            </Provider>
      );
  }
}

ReactDOM.render(
  <ScreenManager />,
  document.getElementById('root')
);

export default hot(module)(ScreenManager)


// {routes}