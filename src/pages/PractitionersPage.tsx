import React from 'react';
import Auth from '../services/Auth';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { search } from '../services/practitionerReadService';
import { connect, Mapping } from 'react-refetch';
import ApiSearchResponse from 'prismic-javascript/d.ts/ApiSearchResponse';

interface PractitionersPageProps {
  auth: Auth;
  search: string;
  resultsFetch: Mapping<PractitionersPageProps, ApiSearchResponse>;
}

class PractitionersPage extends React.Component<PractitionersPageProps, {}> {
  constructor(props: Readonly<PractitionersPageProps>) {
    super(props);
  }

  render() {
    const { auth, resultsFetch } = this.props;
    // TODO: split into 2 comoponents
    const results = resultsFetch.fulfilled
      ? (resultsFetch.value as ApiSearchResponse).results
      : undefined;

    return (
      <>
        <Navigation
          isAuthenticated={auth.isAuthenticated()}
          variant={'light'}
        />
        <div className="container mt-4">
          <form>
            <div className="row">
              <div className="col-6">
                <input type="search" className="form-control" />
              </div>
              <div className="col-2">
                <select className="custom-select bg-primary text-white rounded-0">
                  <option>Therapy type</option>
                </select>
              </div>
              <div className="col-2">
                <select className="custom-select bg-primary text-white rounded-0">
                  <option>Region</option>
                  <option>Auckland</option>
                </select>
              </div>
              <div className="col-2">
                <button type="submit" className="btn btn-primary btn-block">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        {results && (
          <div className="container my-4">
            <div className="list-group">
              {results.map(result => (
                <a
                  key={result.uid}
                  className="list-group-item list-group-item-action"
                  href={`/practitioners/${result.uid}`}
                >
                  {result.data.name[0].text}
                </a>
              ))}
            </div>
          </div>
        )}
        <Footer />
      </>
    );
  }
}

export default connect((props: PractitionersPageProps) => ({
  resultsFetch: {
    comparison: props.search,
    value: () => search({ name: props.search })
  }
}))(PractitionersPage);
