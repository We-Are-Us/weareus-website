import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps
} from 'react-router-dom';
import './styles/styles.scss';

import Auth from './services/Auth';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Callback from './components/Callback';

const auth = new Auth();

const handleAuthentication = (props: RouteComponentProps) => {
  const { history, location } = props;

  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication(history);
  }
};

const App: React.SFC<{}> = () => (
  <Router>
    <div className="m-0 p-0">
      <Route
        exact
        path="/"
        render={props => <HomePage auth={auth} {...props} />}
      />
      <Route
        path="/about"
        render={props => <AboutPage auth={auth} {...props} />}
      />
      <Route
        path="/login"
        render={props => {
          auth.login();

          return <div />;
        }}
      />
      <Route
        path="/callback"
        render={props => {
          handleAuthentication(props);

          return <Callback {...props} />;
        }}
      />
    </div>
  </Router>
);

export default App;
