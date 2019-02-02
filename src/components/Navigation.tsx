import React from 'react';
import classNames from 'classnames';
import NavigationItem from '../content/NavigationItem';
import { LogoPurple, LogoWhite } from './Logo';

interface NavigationProps {
  variant: 'light' | 'dark';
  navigationItems: Array<NavigationItem>;
}

const Navigation: React.SFC<NavigationProps> = ({
  variant,
  navigationItems
}) => (
  <div className="container container-fluid px-0">
    <nav className={`navbar navbar-expand-md navbar-${variant}`}>
      <a className="navbar-brand" href="#">
        {variant === 'dark' ? <LogoWhite /> : <LogoPurple />}
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
