import NavigationItem from '../content/NavigationItem';
import features from './featureService';

export const getHeaderItems = (
  isAuthenticated: boolean
): Array<NavigationItem> => {
  const items = [];

  if (features.variation('AboutPage')) {
    items.push({
      text: 'About',
      href: '/about',
      isButton: false
    });
  }

  /*
  items.push({
    text: 'Practitioners',
    href: '/practitioners',
    isButton: false
  });
  */

  if (features.variation('Login')) {
    items.push({
      text: isAuthenticated ? 'Logout' : 'Login',
      href: isAuthenticated ? '/logout' : '/login',
      isButton: false
    });
  }

  if (features.variation('Register')) {
    items.push({
      text: 'Register',
      href: '#',
      isButton: true
    });
  }

  return items;
};

export const getFooterItems = (): Array<NavigationItem> => {
  const items = [];

  if (features.variation('Register')) {
    items.push({
      text: 'Register as a Practitioner',
      href: '#',
      isButton: true
    });
  }

  items.push({
    text: 'Contact Us',
    href: '#',
    isButton: false
  });

  items.push({
    text: 'Terms & Conditions',
    href: '#',
    isButton: false
  });

  return items;
};
