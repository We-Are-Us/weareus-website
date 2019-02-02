import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// FIXME: write types
import BlockImage from 'react-block-image';
import { getHomePageContentState } from '../redux/selectors';
import { AppState } from '../redux/store';
import Navigation from '../components/Navigation';
import Promo, { PromoDto } from '../components/Promo';
import ResponsiveImageSet, { Breakpoint } from '../content/ResponsiveImageSet';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Auth from '../services/Auth';

export interface HomePageDto {
  auth: Auth;
  heroHeader: string;
  heroText: string;
  heroImages: ResponsiveImageSet;
  leadText: string;
  promo?: PromoDto;
}

interface HomePageProps extends HomePageDto {}

const containerStyle = {
  backgroundColor: 'transparent',
  height: '80vh'
};

const imageStyle = {
  position: 'absolute',
  margin: 0,
  padding: 0,
  height: '80vh',
  width: '100vw',
  zIndex: -1
};
// TODO: probably want to extract a cover image component
const HomePage: React.SFC<HomePageProps> = ({
  auth,
  heroHeader,
  heroText,
  heroImages,
  leadText,
  promo
}) => {
  const { isAuthenticated = () => false } = auth;

  return (
    <>
      <div className="jumbotron jumbotron-fluid pt-0" style={containerStyle}>
        {heroImages && (
          <>
            <div className="d-md-none">
              <BlockImage
                style={imageStyle}
                backgroundSize="cover"
                src={heroImages.getImageForBreakpoint(Breakpoint.sm)}
              />
            </div>
            <div className="d-none d-md-block d-lg-none">
              <BlockImage
                style={imageStyle}
                backgroundSize="cover"
                src={heroImages.getImageForBreakpoint(Breakpoint.md)}
              />
            </div>
            <div className="d-none d-lg-block d-xl-none">
              <BlockImage
                style={imageStyle}
                backgroundSize="cover"
                src={heroImages.getImageForBreakpoint(Breakpoint.lg)}
              />
            </div>
            <div className="d-none d-xl-block">
              <BlockImage
                style={imageStyle}
                backgroundSize="cover"
                src={heroImages.getImageForBreakpoint(Breakpoint.xl)}
              />
            </div>
          </>
        )}
        <Navigation isAuthenticated={isAuthenticated()} variant={'dark'} />
        <div className="container text-white pt-3 pt-lg-5 mx-auto">
          <div className="row">
            <div className="col-11 col-sm-8 col-md-6">
              <h1 className="display-5">{heroHeader}</h1>
              <p className="lead">{heroText}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 mx-auto text-primary">
        <p className="lead">{leadText}</p>
      </div>
      {/* promo && <Promo {...promo} /> */}
      <Newsletter />
      <Footer />
    </>
  );
};

const mapStateToProps = (state: AppState) => {
  const content = getHomePageContentState(state);

  return { ...content };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(HomePage)
);
