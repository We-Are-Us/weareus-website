import React from 'react';
import classNames from 'classnames';
import NavigationItem from '../content/NavigationItem';

interface NavigationProps {
  navigationItems: Array<NavigationItem>;
}

const Navigation: React.SFC<NavigationProps> = ({ navigationItems }) => (
  <div className="container container-fluid px-0">
    <nav className="navbar navbar-expand-md navbar-dark">
      <a className="navbar-brand" href="#">
        We are Us
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {navigationItems.map(navigationItem => {
            const cn = classNames(
              { 'nav-link': !navigationItem.isButton },
              { 'btn btn-outline-light my-2 my-sm-0': navigationItem.isButton }
            );

            return (
              <li className="nav-item pl-md-3">
                <a className={cn} href={navigationItem.href}>
                  {navigationItem.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  </div>
);

export default Navigation;
