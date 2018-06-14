export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const REFRESH_LIST = 'REFRESH_LIST';

export const refreshList = filter => ({
    type: REFRESH_LIST,
    filter
});

export const updateFilter = filter => ({
    type: UPDATE_FILTER,
    filter
});

export const clearFilter = filter => ({
    type: CLEAR_FILTER,
    filter
});

export const requestUsers = filter => ({
    type: REQUEST_USERS,
    filter
});

export const receiveUsers = (filter, json) => ({
    type: RECEIVE_USERS,
    filter,
    users: json,
    receivedAt: Date.now()
});

export const fetchUsers = filter => dispatch => {
    dispatch(requestUsers(filter));
    return filter => {
        //let queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        //console.log(queryString);
        return fetch('http://redux-server.local/api/users')
            .then(response => response.json())
            .then(json => dispatch(receiveUsers(filter, json)))
    }
};

const shouldFetchUsers = (state) => {
    const users = state.users;
    if (!users) {
        return true
    }
    if (state.isFetching) {
        return false
    }
    return state.didRefresh
};

export const fetchUsersIfNeeded = filter => (dispatch, getState) => {
    //if (shouldFetchUsers(getState())) {
        return dispatch(fetchUsers(filter))
   // }
};
