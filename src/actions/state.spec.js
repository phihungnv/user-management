let state = {
    currentFilter: {
        email: '',
        name: '',
        address: ''
    },
    usersByFilter: {
        isFetching: false,
        didRefresh: false,
        users: []
    }
};