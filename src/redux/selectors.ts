import { createSelector } from 'reselect';
import { Asset, Entry } from 'contentful';
import { HomePageDto } from '../pages/HomePage';
import EntryDecorator from '../content/EntryDecorator';
import { AppState } from './store';
import { PromoDto } from '../components/Promo';
import ResponsiveImageSet, { Breakpoint } from '../content/ResponsiveImageSet';
import { CardDto } from '../components/Card';

const getAssetsContent = (state: AppState): Array<Asset> => {
  const { assets } = state.contentful;

  return assets as Array<Asset>;
};

const getAssetContent = (state: AppState, id: string): Asset | undefined =>
  getAssetsContent(state).filter(asset => asset.sys.id === id)[0];

const getAssetUrl = (state: AppState, id: string): string => {
  const asset = getAssetContent(state, id);

  if (asset == null) {
    return '';
  }

  return asset.fields.file.url || asset.fields.file['en-NZ'].url;
};

const getCardContent = (state: AppState, id: string): CardDto | undefined => {
  const { entries } = state.contentful;

  if (entries == null || entries.length === 0) {
    return undefined;
  }

  const cardEntry = entries.filter(
    (entry: Entry<any>) =>
      entry.sys.id === id && entry.sys.contentType.sys.id === 'card'
  )[0];

  if (cardEntry == null) {
    return undefined;
  }

  const decorator = new EntryDecorator(cardEntry);

  return {
    title: decorator.getTextField('title'),
    text: decorator.getRichTextField('text'),
    imageUrl: getAssetUrl(state, decorator.getAssetId('image'))
  };
};

const getResponsiveImageSetContent = (
  state: AppState,
  id: string
): ResponsiveImageSet => {
  const { entries } = state.contentful;

  if (entries == null || entries.length === 0) {
    return new ResponsiveImageSet();
  }

  const responsiveImageSetEntries = entries.filter(
    (entry: Entry<any>) =>
      entry.sys.id === id &&
      entry.sys.contentType.sys.id === 'responsiveImageSet'
  );

  if (responsiveImageSetEntries.length === 0) {
    return new ResponsiveImageSet();
  }

  const entry = responsiveImageSetEntries[0];
  const responsiveImageSet = new ResponsiveImageSet();

  if (entry.fields.sm) {
    responsiveImageSet.sm = getAssetUrl(state, entry.fields.sm['en-NZ'].sys.id);
  }

  if (entry.fields.md) {
    responsiveImageSet.md = getAssetUrl(state, entry.fields.md['en-NZ'].sys.id);
  }

  if (entry.fields.lg) {
    responsiveImageSet.lg = getAssetUrl(state, entry.fields.lg['en-NZ'].sys.id);
  }

  if (entry.fields.xl) {
    responsiveImageSet.xl = getAssetUrl(state, entry.fields.xl['en-NZ'].sys.id);
  }

  return responsiveImageSet;
};

const getPromosContent = (state: AppState): PromoDto | undefined => {
  const { entries } = state.contentful;

  if (entries == null || entries.length === 0) {
    return undefined;
  }

  const promoEntries = entries.filter(
    (entry: Entry<any>) => entry.sys.contentType.sys.id === 'promo'
  );

  const results: Array<PromoDto> = promoEntries
    // TODO: un-any
    .map((entry: Entry<any>) => new EntryDecorator(entry))
    .map((entry: EntryDecorator) => ({
      title: entry.getTextField('title'),
      secondaryTitle: entry.getTextField('title2'),
      text: entry.getTextField('text'),
      backgroundImage: getAssetUrl(state, entry.getAssetId('backgroundImage'))
    }));

  return results[0];
};

const getHomePageContent = (state: AppState) => {
  const { entries } = state.contentful;

  if (entries == null || entries.length === 0) {
    return undefined;
  }

  const homePageEntry = entries.filter(
    (entry: Entry<any>) =>
      entry.sys.contentType.sys.id === 'homePage' &&
      entry.fields.key['en-NZ'] === 'home'
  )[0];

  if (homePageEntry == null) {
    return undefined;
  }

  const decorator = new EntryDecorator(homePageEntry);

  const heroImagesId = decorator.getAssetId('heroImages');
  const heroImages = getResponsiveImageSetContent(state, heroImagesId);

  const cardIds = decorator.getReferenceIds('cards');

  const cards: Array<CardDto> = cardIds.map((id: string) =>
    getCardContent(state, id)
  );

  const result: HomePageDto = {
    heroHeader: decorator.getTextField('heroHeader'),
    heroText: decorator.getTextField('heroText'),
    heroImages,
    leadText: decorator.getTextField('leadText'),
    cards,
    promo: getPromosContent(state)
  };

  return result;
};

export const getHomePageContentState = createSelector(
  [getHomePageContent],
  homePageContent => homePageContent
);

// FIXME: selectors are like queries and reducers are like commans in CQRS
// store should be flat - easy for reducers; selectors change shape for components
// see https://hackernoon.com/selectors-in-redux-are-a-must-d6b0637c79b7

// FIXME: hodgepodge of different approaches because contentful-redux
// doesn't play 100% nice with new things
