import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import SignIn from './layout/Login';
import NotFound from './components/NotFound';
import 'react-overlay-loader/styles.css';
import WebViewer from './webviewer/WebViewer';

const App = () => {
  const isLogoutUser = useSelector(state => state.LogoutUserReducer);

  axios.interceptors.request.use(function(config) {
    config.headers.Authorization = `${localStorage.getItem('SavedToken')}`;
    return config;
  });

  return (
    <Router>
      {isLogoutUser && <Redirect to="/" />}
      <Switch>
        <Route path="/" exact>
          <SignIn />
        </Route>
        <Route path="/webviewer">
          <WebViewer />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
