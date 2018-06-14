import {combineReducers} from 'redux'
import {UPDATE_FILTER, CLEAR_FILTER, RECEIVE_USERS, REQUEST_USERS, REFRESH_LIST} from '../actions'

const currentFilter = (state  = {}, action) => {
    switch (action.type) {
        case UPDATE_FILTER:
            return {...state, ...action.filter};
        case CLEAR_FILTER:
            return {};
        default:
            return state

    }
};

const userByFilter = (state  = {didRefresh: false, isFetching: true, users: []}, action) => {
    switch (action.type) {
        case REQUEST_USERS:
            return {
                ...state,
                didRefresh: false,
                isFetching: true
            };
        case RECEIVE_USERS:
            return {
                ...state,
                isFetching: false,
                didRefresh: false,
                users: action.users
            };
        case REFRESH_LIST:
            return {
                ...state,
                didRefresh: true
            };
        default:
            return state
    }
};

const rootReducer = combineReducers({
    currentFilter,
    userByFilter
});

export default rootReducer