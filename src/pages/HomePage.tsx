import React from 'react';
// FIXME: write types
import BlockImage from 'react-block-image';
import { getHomePageContentState } from '../redux/selectors';
import { connect } from 'react-redux';
import { AppState } from '../redux/store';
import Navigation from '../components/Navigation';
import Promo, { PromoDto } from '../components/Promo';
import ResponsiveImageSet, { Breakpoint } from '../content/ResponsiveImageSet';

export interface HomePageDto {
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

const navigationItems = [
  {
    text: 'About',
    href: '#',
    isButton: false
  },
  {
    text: 'Practitioners',
    href: '#',
    isButton: false
  },
  {
    text: 'Login',
    href: '#',
    isButton: false
  },
  {
    text: 'Register',
    href: '#',
    isButton: true
  }
];

// TODO: probably want to extract a cover image component
const HomePage: React.SFC<HomePageProps> = ({
  heroHeader,
  heroText,
  heroImages,
  leadText,
  promo
}) => {
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
        <Navigation variant={'dark'} navigationItems={navigationItems} />
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
    </>
  );
};

const mapStateToProps = (state: AppState) => {
  const content = getHomePageContentState(state);

  return { ...content };
};

export default connect(
  mapStateToProps,
  null
)(HomePage);
