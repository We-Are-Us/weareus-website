import { createSelector } from 'reselect';
import * as contentful from 'contentful';
import { selectors } from './reducers/contentful';
import { Entry } from 'contentful';
import { HomePageDto } from '../pages/HomePage';
import EntryDecorator from '../content/EntryDecorator';

// FIXME: hodgepodge of different approaches because contentful-redux
// doesn't play 100% nice with new things
export const getHomePageText = (state: any): HomePageDto => {
  const { entries, contentTypes } = state.contentful;

  if (entries == null || entries.length === 0) {
    return { heroHeader: '', heroText: '', heroImageId: '', leadText: '' };
  }

  const homePageEntries = entries.filter(
    (entry: Entry<any>) => entry.sys.contentType.sys.id === 'homePage'
  );

  if (homePageEntries.length === 0) {
    return { heroHeader: '', heroText: '', heroImageId: '', leadText: '' };
  }

  // TODO: what to do if there are more than 1?
  const decorator = new EntryDecorator(homePageEntries[0]);

  const result: HomePageDto = {
    heroHeader: decorator.getTextField('heroHeader'),
    heroText: decorator.getTextField('heroText'),
    heroImageId: decorator.getAssetId('heroImage'),
    leadText: decorator.getTextField('leadText'),
    // FIXME: we don't need to async this we can select from contentful tree
    promoId: decorator.getReferenceId('promo')
  };

  return result;
};

/* createSelector(
  selectors.entries,
  selectors.contentTypes,
  (entries, contentTypes) => {
    console.log('entries', entries);
    console.log('contentTypes', contentTypes);

    return []; //entries.filter(each => each.__contentType__ === contentTypes.myModel)
  }
);
*/
