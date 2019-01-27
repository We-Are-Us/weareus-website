import { Dispatch } from 'redux';
import * as contentful from 'contentful';
import {
  REQUEST_HOME_PAGE_IMAGE,
  RECEIVE_HOME_PAGE_IMAGE,
  REQUEST_HOME_PAGE_PROMO,
  RECEIVE_HOME_PAGE_PROMO
} from './actionTypes';
import { PromoDto } from '../components/Promo';
import EntryDecorator from '../content/EntryDecorator';

export const requestHomePageImage = (assetId: string) => ({
  type: REQUEST_HOME_PAGE_IMAGE,
  payload: {
    assetId
  }
});

export const receiveHomePageImage = (url: string) => ({
  type: RECEIVE_HOME_PAGE_IMAGE,
  payload: {
    url
  }
});

export const requestHomePagePromo = (promoId: string) => ({
  type: REQUEST_HOME_PAGE_PROMO,
  payload: {
    promoId
  }
});

export const receiveHomePagePromo = (promo: PromoDto) => ({
  type: RECEIVE_HOME_PAGE_PROMO,
  payload: {
    promo
  }
});

export const requestHomePageImageAsync = (assetId: string) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(requestHomePageImage(assetId));

  const contentfulClient = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || ''
  });

  console.log('getting asset', assetId);
  const asset = await contentfulClient.getAsset(assetId);

  const url = asset.fields.file.url;

  dispatch(receiveHomePageImage(url));
};

export const requestHomePagePromoAsync = (promoId: string) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(requestHomePagePromo(promoId));

  const contentfulClient = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || ''
  });

  console.log('getting entry', promoId);
  const entry = await contentfulClient.getEntry(promoId);

  const decorator = new EntryDecorator(entry);

  const promo: PromoDto = {
    title: decorator.getTextField('title'),
    secondaryTitle: decorator.getTextField('title2'),
    text: decorator.getTextField('text'),
    backgroundImageId: decorator.getAssetId('backgroundImage')
  };

  dispatch(receiveHomePagePromo(promo));
};
