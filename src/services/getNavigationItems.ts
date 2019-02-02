import NavigationItem from '../content/NavigationItem';

const getNavigationItems = (
  isAuthenticated: boolean
): Array<NavigationItem> => {
  return [
    {
      text: 'About',
      href: '/about',
      isButton: false
    },
    {
      text: 'Practitioners',
      href: '#',
      isButton: false
    },
    {
      text: isAuthenticated ? 'Logout' : 'Login',
      href: isAuthenticated ? '/logout' : '/login',
      isButton: false
    },
    {
      text: 'Register',
      href: '#',
      isButton: true
    }
  ];
};

export default getNavigationItems;
