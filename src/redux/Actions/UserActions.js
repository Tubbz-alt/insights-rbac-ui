import * as ActionTypes from '../ActionTypes';
import * as UserHelper from '../../Helpers/User/UserHelper';

const doFetchUsers = () => ({
  type: ActionTypes.FETCH_USERS,
  payload: new Promise(resolve => {
    resolve(UserHelper.fetchUsers());
  })
});

export const fetchUsers = () => (dispatch, getState) => {
  const { userReducer: { isUserDataLoading }} = getState();
  if (!isUserDataLoading) {
    return dispatch(doFetchUsers());
  }
};

export const fetchGroupsByUserId = apiProps => ({
  type: ActionTypes.FETCH_GROUPS_BY_USER_ID,
  payload: new Promise(resolve => {
    resolve(UserHelper.fetchGroupsByUserId(apiProps));
  })
});

export const addUser = (userData) => ({
  type: ActionTypes.ADD_USER,
  payload: UserHelper.addUser(userData),
  meta: {
    notifications: {
      fulfilled: {
        variant: 'success',
        title: 'Success adding approver',
        description: 'The approver was added successfully.'
      },
      rejected: {
        variant: 'danger',
        title: 'Failed adding approver',
        description: 'The approver was not added successfuly.'
      }
    }
  }
});

export const updateUser = (userData) => ({
  type: ActionTypes.UPDATE_USER,
  payload: UserHelper.updateUser(userData),
  meta: {
    notifications: {
      fulfilled: {
        variant: 'success',
        title: 'Success updating approver',
        description: 'The approver was updated successfully.'
      },
      rejected: {
        variant: 'danger',
        title: 'Failed updating approver',
        description: 'The approver was not updated successfuly.'
      }
    }
  }
});

export const removeUser = (user) => ({
  type: ActionTypes.REMOVE_USER,
  payload: UserHelper.removeUser(user),
  meta: {
    notifications: {
      fulfilled: {
        variant: 'success',
        title: 'Success removing user',
        description: 'The user was removed successfully.'
      }
    }
  }
});

