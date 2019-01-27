import { Action } from 'typescript-fsa';
import { ContentfulClientApi } from 'contentful';
import { AppState } from '../store';
import { Dispatch, Store } from 'redux';
import { middleware } from '../reducers/contentful';

const SYNC = 'Contentful/SYNC';
const SYNC_PENDING = 'Contentful/SYNC_PENDING';
const SYNC_FINISHED = 'Contentful/SYNC_FINISHED';
const SYNC_FAILED = 'Contentful/SYNC_FAILED';

const constants = {
  SYNC,
  SYNC_PENDING,
  SYNC_FINISHED,
  SYNC_FAILED
};

interface ClientParams {
  space: string;
  accessToken: string;
}

interface Options {
  clientParams?: Object;
  createClient: (clientParams: ClientParams) => ContentfulClientApi;
  stateSelector: (state: AppState) => AppState;
  space: string;
  accessToken: string;
}

const handleContentfulAction = async (
  client: ContentfulClientApi,
  action: Action<any>,
  state: AppState,
  dispatch: Dispatch,
  options: Options
) => {
  if (action.type === constants.SYNC) {
    dispatch({ type: constants.SYNC_PENDING, spaceId: options.space });
    try {
      const [space, contentTypes, syncResult] = await Promise.all([
        client.getSpace(),
        client.getContentTypes({ limit: 1000 }),
        client.sync({
          initial: Boolean(!state.nextSyncToken),
          nextSyncToken: state.nextSyncToken,
          resolveLinks: false
        })
      ]);
      dispatch({
        type: constants.SYNC_FINISHED,
        spaceId: options.space,
        space,
        contentTypes: contentTypes.toPlainObject().items,
        date: new Date(),
        ...syncResult.toPlainObject()
      });
    } catch (err) {
      dispatch({
        type: constants.SYNC_FAILED,
        spaceId: options.space,
        date: new Date(),
        error: err.toString()
      });
    }
  }
};

const makeMiddleware = (options: Options) => (store: Store<AppState>) => {
  const clientParams = {
    ...(options.clientParams || {}),
    space: options.space,
    accessToken: options.accessToken
  };

  const client = options.createClient(clientParams);

  const relevantActions = [constants.SYNC];

  return next => async (action: Action<any>) => {
    const state = options.stateSelector(store.getState());
    const result = next(action);
    if (
      relevantActions.includes(action.type) &&
      action.spaceId === options.space
    ) {
      return handleContentfulAction(
        client,
        action,
        state,
        store.dispatch,
        options
      );
    }
    return result;
  };
};

export { makeMiddleware };
