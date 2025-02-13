// src/pages/UserList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:9999/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:9999/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setUsers(users.filter(user => user.id !== id));
          toast.success('User deleted successfully!');
        } else {
          toast.error('Failed to delete user!');
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user!');
      });
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>User List</h2>
      {/* <Form inline className="mb-3">
        <FormControl
          type="text"
          placeholder="Search users"
          className="mr-sm-2"
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* <Link to="/manage/add-user" className="btn btn-primary">Add User</Link> 
      </Form> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/manage/customer/view/${user.id}`} className="btn btn-warning mr-2" style={{ marginRight: '10px' }}>View</Link>
                {/* <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
