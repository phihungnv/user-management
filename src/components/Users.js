import React from 'react';

const Users = ({users}) => (
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, i) =>
                <tr key={i}>
                    <td><img src={user.avatar} width={60} alt={user.name}/></td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                </tr>
            )}
        </tbody>
    </table>
);

export default Users
