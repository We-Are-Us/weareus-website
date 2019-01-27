import React from 'react';
// FIXME: write types
import BlockImage from 'react-block-image';
import { getHomePageText } from '../redux/selectors';
import { connect } from 'react-redux';
import { AppState } from '../redux/store';
import { Dispatch } from 'redux';
import {
  requestHomePageImageAsync,
  requestHomePagePromoAsync
} from '../redux/actions';
import Promo, { PromoDto } from '../components/Promo';

export interface HomePageDto {
  heroHeader: string;
  heroText: string;
  heroImageId: string;
  leadText: string;
  promoId?: string;
}

interface HomePageProps extends HomePageDto {
  heroImage: string;
  promo?: PromoDto;
  dispatch: Dispatch;
}

const containerStyle = {
  height: '80vh'
};

const imageStyle = {
  position: 'absolute',
  height: '80vh',
  width: '100%',
  zIndex: -1
};

// TODO: probably want to extract a cover image component
const HomePage: React.SFC<HomePageProps> = ({
  heroHeader,
  heroText,
  heroImage,
  heroImageId,
  leadText,
  promoId,
  promo,
  dispatch
}) => {
  // FIXME: dodgy AF
  if (heroImageId !== '' && heroImage == null) {
    dispatch(requestHomePageImageAsync(heroImageId));
  }

  if (promoId == null && promoId !== '' && promo == null) {
    dispatch(requestHomePagePromoAsync(promoId));
  }

  return (
    <>
      <div className="container container-fluid p-0 m-0" style={containerStyle}>
        <BlockImage backgroundSize="cover" src={heroImage} style={imageStyle} />
        <div className="py-5">{/* nav */}</div>
        <div className="container text-white pt-1 pt-lg-5 mx-3 mx-lg-5">
          <div className="row">
            <div className="col-11 col-sm-8 col-md-6">
              <h1 className="display-5">{heroHeader}</h1>
              <p className="lead">{heroText}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 text-primary">
        <p className="lead">{leadText}</p>
      </div>
      {promo && <Promo {...promo} />}
    </>
  );
};

const mapStateToProps = (state: AppState) => {
  const content = getHomePageText(state);
  const heroImage = state.homePage ? state.homePage.heroImage : '';
  const promo = state.homePage ? state.homePage.promo || {} : {};

  return { ...content, heroImage, promo };
};

export default connect(
  mapStateToProps,
  null
)(HomePage);
