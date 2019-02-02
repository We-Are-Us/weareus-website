import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Auth from '../services/Auth';

interface AboutPageProps {
  auth: Auth;
}

const AboutPage: React.SFC<AboutPageProps> = ({ auth }) => (
  <>
    <Navigation isAuthenticated={auth.isAuthenticated()} variant={'light'} />
    <div className="container">
      <p>About</p>
    </div>
    <Footer />
  </>
);

export default withRouter(
  connect(
    null,
    null
  )(AboutPage)
);
