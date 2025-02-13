// src/pages/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9999/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user:', error));
  }, [id]);

  if (!user) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      <Card>
        <Card.Body>
          <Card.Title>{user.name.firstname} {user.name.lastname}</Card.Title>
          <Card.Text>
            <strong>Username:</strong> {user.username} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Phone:</strong> {user.phone} <br />
            <strong>Address:</strong> {user.address.street}, {user.address.city} <br />
            <strong>Role:</strong> {user.role}
          </Card.Text>
          <Link to="/manage/customers" className="btn btn-primary">Back to User List</Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserProfile;
