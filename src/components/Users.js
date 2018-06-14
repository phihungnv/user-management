import React from 'react';

const Users = ({users}) => (
    <table className="tableUsers">
        <thead>
        <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user, i) =>
        <tr key={i}>
            <td><img width='80' src={user.avatar} alt={user.name}/></td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
        </tr>
        )}
        </tbody>
    </table>
)

export default Users