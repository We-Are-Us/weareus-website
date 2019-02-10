import React from 'react';
import Auth from '../services/Auth';
import Navigation from '../components/Navigation';
import { AppState } from '../redux/store';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  getRegisterPageContentState,
  PricingTier
} from '../redux/reducers/registerPage';

interface RegisterProps {
  auth: Auth;
  pricingTiers: Array<PricingTier>;
}

const RegisterPage: React.SFC<RegisterProps> = ({ auth, pricingTiers }) => (
  <>
    <Navigation isAuthenticated={auth.isAuthenticated()} variant={'light'} />
    <div className="container">
      {pricingTiers && pricingTiers.length > 0 && (
        <div className="card-group">
          {pricingTiers.map(tier => (
            <div key={tier.title} className="card shadow">
              <div className="bg-light text-center p-4">
                <h3 className="h3 text-primary">{tier.title}</h3>
                <p>{tier.description}</p>
                <p className="h2 text-primary">${tier.price}</p>
                <p className="text-muted">NZD/month</p>
                <button className="btn btn-primary">Get Started</button>
              </div>
              <div className="card-body">
                <div className="font-weight-bold">Features</div>
                <ul className="pt-2 pl-3">
                  {tier.features.map(feature => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
);

const mapStateToProps = (state: AppState) => {
  const content = getRegisterPageContentState(state);

  return { ...content };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(RegisterPage)
);
