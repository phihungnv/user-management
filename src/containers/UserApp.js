import React, {Component} from 'react';
import {connect} from "react-redux";
import {updateFilter, refresh, clearFilter, fetchUsersIfNeeded} from "../actions/user.action";

import Users from '../components/Users';
import Loader from '../components/Loader';

import '../style/bootstrap.min.css';
import '../style/UserApp.css';

class UserApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clickSearch: false
        }
    }

    componentDidMount() {
        const {dispatch, selectedFilter} = this.props;
        dispatch(fetchUsersIfNeeded(selectedFilter));
    }

    handleChangeFilter = filter => {
        const {dispatch, selectedFilter} = this.props;
        let new_filter = {...selectedFilter, ...filter};
        dispatch(updateFilter(new_filter));
    };

    handleSearchButton = () => {
        const {dispatch, selectedFilter} = this.props;
        dispatch(fetchUsersIfNeeded(selectedFilter));
    };

    handleRefreshButton = () => {
        const {dispatch, selectedFilter} = this.props;
        dispatch(refresh());
        dispatch(fetchUsersIfNeeded(selectedFilter));
    };

    handleClearButton = () => {
        this.props.dispatch(clearFilter());
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedFilter !== this.props.selectedFilter) {
            const {dispatch, selectedFilter} = nextProps;
            dispatch(fetchUsersIfNeeded(selectedFilter))
        }
    }

    render() {
        const {users, selectedFilter, isFetching} = this.props;
        const total = users.length;
        return (
            <div className="container">
                <h2>User Manager</h2>
                <div className="form mb-3">
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="text"
                               className="form-control"
                               value={selectedFilter.email || ''}
                               placeholder="Enter email" onChange={e => this.handleChangeFilter({email: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text"
                               className="form-control"
                               value={selectedFilter.name || ''}
                               placeholder="Enter name" onChange={e => this.handleChangeFilter({name: e.target.value})}/>
                    </div>
                    <button type="button" disabled={isFetching ? 'disabled' : ''} className="btn btn-primary mr-1" onClick={() => this.handleSearchButton()}>Search</button>
                    <button type="button" disabled={isFetching ? 'disabled' : ''} className="btn btn-info mr-1" onClick={() => this.handleRefreshButton()}>Refresh</button>
                    <button type="button" disabled={isFetching ? 'disabled' : ''} className="btn btn-outline-secondary" onClick={() => this.handleClearButton()}>Clear Filter</button>
                </div>

                <div className="mb-3">Total: {total}</div>

                {isFetching ? <Loader /> : <Users users={users} />}
            </div>
        )
    };
}

const mapStateToProps = state => {
    const {selectedFilter, usersByFilter} = state;
    const {
        isFetching,
        lastUpdated,
        users
    } = usersByFilter || {
        isFetching: true,
        users: []
    };

    return {
        selectedFilter,
        users,
        isFetching,
        lastUpdated
    }
};

export default connect(mapStateToProps)(UserApp)