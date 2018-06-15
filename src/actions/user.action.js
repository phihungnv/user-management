export const REQUEST_USERS = 'REQUEST_POSTS';
export const RECEIVE_USERS = 'RECEIVE_POSTS';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const REFRESH = 'REFRESH';

export const updateFilter = filter => ({
    type: UPDATE_FILTER,
    filter
});

export const clearFilter = () => ({
    type: CLEAR_FILTER,
});

export const requestUsers = filter => ({
    type: REQUEST_USERS,
    filter
});

export const refresh = () => ({
    type: REFRESH,
    isRefresh: true
});

export const receiveUsers = (filter, json) => ({
    type: RECEIVE_USERS,
    filter,
    users: json,
    receivedAt: Date.now()
});

export const fetchUsers = filter => dispatch => {
    dispatch(requestUsers(filter));
    let queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
    return fetch(`http://redux-server.local/api/users?${queryString}`)
        .then(response => response.json())
        .then(json => dispatch(receiveUsers(filter, json)))
};

const shouldFetchUsers = (state) => {
    const users = state.users;
    if (!users) {
        return true
    }
    if (users.isFetching) {
        return false
    }
    return users.isRefresh
};

export const fetchUsersIfNeeded = filter => (dispatch, getState) => {
    if (shouldFetchUsers(getState())) {
        return dispatch(fetchUsers(filter))
    }
}