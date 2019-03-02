import React from 'react';
import Auth from '../services/Auth';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface PractitionersPageProps {
  auth: Auth;
}

const PractitionersPage: React.SFC<PractitionersPageProps> = ({ auth }) => (
  <>
    <Navigation isAuthenticated={auth.isAuthenticated()} variant={'light'} />
    <div className="container">
      <ul>
        <li>
          <a href="/practitioners/atma-studio-yoga">Atma Studio Yoga</a>
        </li>
      </ul>
    </div>
    <Footer />
  </>
);

export default PractitionersPage;
