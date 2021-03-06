import configureStore from 'redux-mock-store' ;
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { Group } from 'rbac_api_jsclient';
import { notificationsMiddleware, ADD_NOTIFICATION } from '@red-hat-insights/insights-frontend-components/components/Notifications';
import {
  FETCH_GROUPS,
  FETCH_USERS_BY_GROUP_ID,
  ADD_GROUP,
  UPDATE_GROUP,
  REMOVE_GROUP
} from '../../../redux/ActionTypes';
import {
  fetchGroups,
  fetchUsersByGroupId,
  addGroup,
  updateGroup,
  removeGroup
} from '../../../redux/Actions/GroupActions';
import {
  RBAC_API_BASE
} from '../../../Utilities/Constants';

describe('Group actions', () => {
  const middlewares = [ thunk, promiseMiddleware(), notificationsMiddleware() ];
  let mockStore;

  beforeEach(() => {
    mockStore = configureStore(middlewares);
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it('should create correct action creators when adding group', () => {
    const store = mockStore({});
    apiClientMock.post(RBAC_API_BASE + '/groups/', mockOnce({
      body: [{ data: {
        uuid: 'uuid',
        name: 'DemoGroup'
      }}]
    }));

    const expectedActions = [
      expect.objectContaining({ type: `${ADD_GROUP}_PENDING` }),
      expect.objectContaining({ type: ADD_NOTIFICATION, payload: expect.objectContaining({ variant: 'success' }) }),
      expect.objectContaining({ type: `${ADD_GROUP}_FULFILLED` })
    ];

    return store.dispatch(addGroup({ data: { name: 'DemoGroup', description: 'desc' }}))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create error action creators when adding group failed', () => {
    const store = mockStore({});
    apiClientMock.post(RBAC_API_BASE + '/groups/', mockOnce({
      status: 500
    }));

    const expectedActions = [
      expect.objectContaining({ type: `${ADD_GROUP}_PENDING` }),
      expect.objectContaining({ type: ADD_NOTIFICATION, payload: expect.objectContaining({ variant: 'danger' }) }),
      expect.objectContaining({ type: `${ADD_GROUP}_REJECTED` })
    ];

    return store.dispatch(addGroup({ data: { name: 'new group', description: 'new_desc' }}))
    .catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
