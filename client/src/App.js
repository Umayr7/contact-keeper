import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { About } from './components/layout/About';
import { Home } from './components/layout/Home';
import { Navbar } from './components/layout/Navbar';
import AuthState from './context/auth/AuthState';
import ContactState from './context/contact/ContactState'
import AlertState from './context/alert/AlertState';
import { Alert } from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { PrivateRoute } from './components/routing/PrivateRoute';

if(localStorage.token) {
  setAuthToken(localStorage.token); 
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
