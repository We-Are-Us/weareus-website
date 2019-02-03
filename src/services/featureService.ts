declare var FEATURES: any;

type FeatureName = 'AboutPage' | 'Login' | 'Register';

interface User {
  email?: string;
  // TODO: rolename type
  role?: string;
}

class FeatureService {
  private user?: User;

  constructor(user?: User) {
    this.user = user;

    this.identify = this.identify.bind(this);
  }

  identify(user: User) {
    this.user = user;
  }

  variation(featureName: FeatureName, defaultValue: boolean = false) {
    const feature = FEATURES[featureName];

    return feature || defaultValue;
  }
}

const featureService = new FeatureService();

export default featureService;
