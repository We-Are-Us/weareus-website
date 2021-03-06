import React from 'react';
import { Link } from 'react-router-dom';
import { getFooterItems } from '../services/navigation';

const Footer: React.SFC<{}> = () => {
  const navigationItems = getFooterItems();

  return (
    <div className="container px-0 pb-3">
      <nav className="navbar navbar-expand navbar-light">
        <Link className="navbar-brand" to="/">
          <img src="/assets/logo_footer.svg" />
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {navigationItems.map(navigationItem => (
              <li
                key={navigationItem.text}
                className="nav-item d-none d-md-block"
              >
                <a className="nav-link" href={navigationItem.href}>
                  <small>{navigationItem.text}</small>
                </a>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.instagram.com/we_are_us_nz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/icon_instagram.svg" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Footer;
