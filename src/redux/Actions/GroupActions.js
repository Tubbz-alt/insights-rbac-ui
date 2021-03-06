import * as ActionTypes from '../ActionTypes';
import * as GroupHelper from '../../Helpers/Group/GroupHelper';

export const doFetchGroups = apiProps => ({
  type: ActionTypes.FETCH_GROUPS,
  payload: new Promise(resolve => {
    resolve(GroupHelper.fetchGroups(apiProps));
  })
});

export const fetchGroups = apiProps => (dispatch, getState) => {
  const { groupReducer: { isLoading }} = getState();
  if (!isLoading) {
    return dispatch(doFetchGroups(apiProps));
  }
};

export const fetchUsersByGroupId = apiProps => ({
  type: ActionTypes.FETCH_USERS_BY_GROUP_ID,
  payload: new Promise(resolve => {
    resolve(GroupHelper.fetchUsersByGroupId(apiProps));
  })
});

export const addGroup = (groupData) => ({
  type: ActionTypes.ADD_GROUP,
  payload: GroupHelper.addGroup(groupData),
  meta: {
    notifications: {
      fulfilled: {
        variant: 'success',
        title: 'Success adding group',
        description: 'The group was added successfully.'
      },
      rejected: {
        variant: 'danger',
        title: 'Failed adding group',
        description: 'The group was not added successfuly.'
      }
    }
  }
});

export const addToGroup = (groupId, items) => ({
  type: ActionTypes.ADD_TO_GROUP,
  payload: GroupHelper.addToGroup(groupId, items),
  meta: {
    notifications: {
      fulfilled: {
        variant: 'success',
        title: 'Success adding users',
        description: 'Users were successfully added to group.'
      }
    }
  }
});

export const updateGroup = (groupData) => ({
  type: ActionTypes.UPDATE_GROUP,
  payload: GroupHelper.updateGroup(groupData),
  meta: {
    notifications: {
      fulfilled: {
        variant: 'success',
        title: 'Success updating group',
        description: 'The group was updated successfully.'
      },
      rejected: {
        variant: 'danger',
        title: 'Failed updating group',
        description: 'The group was not updated successfuly.'
      }
    }
  }
});

export const removeGroup = (group) => ({
  type: ActionTypes.REMOVE_GROUP,
  payload: GroupHelper.removeGroup(group),
  meta: {
    notifications: {
      fulfilled: {
        variant: 'success',
        title: 'Success removing group',
        description: 'The group was removed successfully.'
      }
    }
  }
});
