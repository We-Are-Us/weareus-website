import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { getHeaderItems } from '../services/navigation';
import { LogoPurple, LogoWhite } from './Logo';

interface NavigationProps {
  isAuthenticated: boolean;
  variant: 'light' | 'dark';
}

const Navigation: React.SFC<NavigationProps> = ({
  isAuthenticated,
  variant
}) => {
  const containerClassnames = classNames('container-fluid px-0', {
    'border-bottom': variant === 'light'
  });

  const navClassnames = classNames(
    'navbar navbar-expand-md',
    {
      'navbar-dark': variant === 'dark'
    },
    {
      'navbar-light': variant === 'light'
    }
  );

  const navigationItems = getHeaderItems(isAuthenticated);

  return (
    <div className={containerClassnames}>
      <div className="container px-0">
        <nav className={navClassnames}>
          <Link className="navbar-brand" to="/">
            {variant === 'dark' ? <LogoWhite /> : <LogoPurple />}
          </Link>
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
                  { 'btn my-2 my-sm-0': navigationItem.isButton },
                  {
                    'btn-outline-light':
                      navigationItem.isButton && variant === 'dark'
                  },
                  {
                    'btn-outline-primary':
                      navigationItem.isButton && variant === 'light'
                  }
                );

                return (
                  <li key={navigationItem.text} className="nav-item pl-md-3">
                    <Link className={cn} to={navigationItem.href}>
                      {navigationItem.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
