import {combineReducers} from 'redux';
import {REQUEST_USERS, RECEIVE_USERS, UPDATE_FILTER, REFRESH, CLEAR_FILTER} from '../actions/user.action';

const selectedFilter = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_FILTER:
            return action.filter;
        case CLEAR_FILTER:
            return {};
        default:
            return state
    }
};

const usersByFilter = (state = {
    isFetching: false,
    users: []
}, action) => {
    switch (action.type) {
        case REFRESH:
            return {
                ...state,
                isRefresh: true,
            };
        case REQUEST_USERS:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USERS:
            return {
                ...state,
                isFetching: false,
                isRefresh: false,
                users: action.users,
                lastUpdated: action.receivedAt
            };
        default:
            return state
    }
};

const userReducer = combineReducers({
    selectedFilter,
    usersByFilter
});

export default userReducer
