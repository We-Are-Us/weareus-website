import { WebAuth } from 'auth0-js';
import { History } from 'history';

type Nullable<T> = T | null;

class Auth {
  accessToken?: Nullable<string>;
  idToken?: Nullable<string>;
  expiresAt: number;
  auth0: WebAuth;

  constructor() {
    this.auth0 = new WebAuth({
      domain: process.env.AUTH_DOMAIN || '',
      clientID: process.env.AUTH_CLIENT_ID || '',
      redirectUri: process.env.AUTH_CALLBACK_URL,
      responseType: 'token id_token',
      scope: 'openid'
    });

    this.expiresAt = 0;

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  // TODO: make async
  handleAuthentication(history: History) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, history);
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  // FIXME: de-any
  setSession(authResult: any, history: History) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // FIXME:
    // navigate to the home route
    history.replace('/');
  }

  renewSession(history: History) {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, history);
      } else if (err) {
        this.logout(history);
        console.log(err);
        alert(`Could not get a new token (${err.error}).`);
      }
    });
  }

  logout(history: History) {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    // FIXME
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated(): boolean {
    return new Date().getTime() < (this.expiresAt || 0);
  }
}

export default Auth;
