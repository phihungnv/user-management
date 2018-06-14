import React, {Component} from 'react'
import { connect } from 'react-redux'
import Buttons from '../components/Buttons'
import Inputs from '../components/Inputs'
import Users from '../components/Users'

import {updateFilter, fetchUsersIfNeeded} from '../actions';

import '../App.css';

class App extends Component {

    componentDidMount () {
        const {dispatch, currentFilter} = this.props;
        dispatch(fetchUsersIfNeeded(currentFilter))
    }

    handleChangeFilter = (input) => {
        this.props.dispatch(updateFilter({...this.props.filter, ...input}));
    };

    render() {
        const {currentFilter, users, isFetching} = this.props;
        const isEmpty = users.length === 0;
        return (
            <div className="App">
                <h3>Users</h3>

                <Inputs onChangeFilter={this.handleChangeFilter}/>

                <Buttons />

                <Users users={users}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentFilter, usersByFilter} = state;
    const {
        isFetching,
        users: users
    } = usersByFilter || {
        isFetching: true,
        users: []
    };

    return {
        currentFilter,
        users,
        isFetching
    }
};

export default connect(mapStateToProps)(App)
