import { AppState } from '../store';
import { createSelector } from 'reselect';
import { Entry } from 'contentful';
import EntryDecorator from '../../content/EntryDecorator';

const NO_CONTENT = {
  pricingTiers: []
};

export interface PricingTier {
  identifier: string;
  title: string;
  price: number;
  featureName: string;
  description: string;
  features: Array<string>;
}

const getRegisterPageContent = (state: AppState) => {
  const { entries } = state.contentful;

  if (entries == null || entries.length === 0) {
    return NO_CONTENT;
  }

  const pricingTiers = entries
    .filter(
      (entry: Entry<any>) => entry.sys.contentType.sys.id === 'pricingTier'
    )
    .map((entry: Entry<any>) => {
      const decorator = new EntryDecorator(entry);

      console.dir(entry);

      const title = decorator.getTextField('title');

      // TODO: enrich pricing tiers with price and order by price
      const price = (() => {
        switch (title) {
          case 'Basic':
            return 30;
          case 'Standard':
            return 50;
        }
      })();

      return {
        identifier: decorator.getTextField('identifier'),
        title,
        price,
        featureName: `${decorator.getTextField('featureKey')}Tier`,
        description: decorator.getTextField('shortDescription'),
        features: decorator.getArray('feautres')
      };
    })
    .sort((a: PricingTier, b: PricingTier) => a.price - b.price);

  return {
    pricingTiers
  };
};

export const getRegisterPageContentState = createSelector(
  [getRegisterPageContent],
  registerPageContent => registerPageContent
);
