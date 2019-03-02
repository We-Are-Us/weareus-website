// FIXME: Prismic doesn't have a write API - maybe we want to swap to Contentful instead?
// given Prismic's clear support of page models maybe that's a better idea
// or could we use integration fields?
// https://intercom.help/prismicio/integration-fields/introduction-to-integration-fields/introduction-to-integration-fields
// this might be fine because of editing workflow too
// 1. editor works against db (versioning? localstorage?)
// 2. changes submitted for approval (maybe draft table?)
// 3. changes approved - available via integration fields
// 4. notification of approval when integration fields read?
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/d.ts/documents';

const apiEndpoint = 'https://weareus.prismic.io/api/v2';

export const byUid = (id: string): Promise<Document> =>
  Prismic.api(apiEndpoint).then(api => api.getByUID('practitioner', id));
