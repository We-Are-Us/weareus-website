import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.SFC<{}> = () => (
  <div className="container px-0 pb-3">
    <nav className="navbar navbar-expand navbar-light">
      <Link className="navbar-brand" to="/">
        <img src="/assets/logo_footer.svg" />
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item d-none d-md-block">
            <a className="nav-link" href="#">
              <small>Register as a Practitioner</small>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <small>Contact Us</small>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <small>Terms &amp; Conditions</small>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Footer;
