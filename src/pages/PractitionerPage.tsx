import React from 'react';
import { connect, Mapping } from 'react-refetch';
import { Document } from 'prismic-javascript/d.ts/documents';
import Auth from '../services/Auth';
import { byUid } from '../services/practitionerReadService';
import Practitioner from '../components/Practitioner';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export interface PractitionerPageProps {
  auth: Auth;
  id: string;
  practitionerFetch: Mapping<PractitionerPageProps, Document>;
}

/*
const AboutPage: React.SFC<AboutPageProps> = ({ auth }) => (
  <>
    <Navigation isAuthenticated={auth.isAuthenticated()} variant={'light'} />
    <div className="container">
      <p>About</p>
    </div>
    <Footer />
  </>
);

*/

class PractitionerPage extends React.Component<PractitionerPageProps, {}> {
  constructor(props: Readonly<PractitionerPageProps>) {
    super(props);
  }

  render() {
    const { auth, practitionerFetch } = this.props;
    const practitioner = practitionerFetch.fulfilled
      ? (practitionerFetch.value as Document)
      : undefined;

    return (
      <>
        <Navigation
          isAuthenticated={auth.isAuthenticated()}
          variant={'light'}
        />
        {practitionerFetch.fulfilled && (
          <Practitioner
            id={practitioner!.id}
            name={practitioner!.data.name[0].text}
            about={practitioner!.data.about.map((about: any) => about.text)}
            logoImageUrl={practitioner!.data.logo.url}
            heroImageUrl={practitioner!.data.hero.url}
          />
        )}
        <Footer />
      </>
    );
  }
}

export default connect((props: PractitionerPageProps) => ({
  practitionerFetch: {
    comparison: props.id,
    value: () => byUid(props.id)
  }
}))(PractitionerPage);
