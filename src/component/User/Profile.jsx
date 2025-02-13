import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    city: '',
    street: '',
    username: '',
    state: '',
    zip: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        firstname: storedUser.name.firstname,
        lastname: storedUser.name.lastname,
        email: storedUser.email,
        phone: storedUser.phone,
        city: storedUser.address.city,
        street: storedUser.address.street,
        username: storedUser.username,
        state: storedUser.address.state || '',
        zip: storedUser.address.zip || ''
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    fetch(`http://localhost:9999/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...user,
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname
        },
        email: formData.email,
        phone: formData.phone,
        address: {
          city: formData.city,
          street: formData.street,
          state: formData.state,
          zip: formData.zip
        },
        username: formData.username
      })
    })
    .then(response => response.json())
    .then(data => {
      setUser(data);
      setEditMode(false);
      localStorage.setItem('user', JSON.stringify(data));
    });
  };

  return (
    <Container className="profile-container">
      {user && (
        <Row className="gutters">
          <Col xl={3} lg={3} md={12} sm={12} col={12}>
            <Card className="h-100">
              <Card.Body>
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="User Avatar" />
                    </div>
                    <h5 className="user-name">{`${user.name.firstname} ${user.name.lastname}`}</h5>
                    <h6 className="user-email">{user.email}</h6>
                  </div>
                  <div className="about">
                    <h5>About</h5>
                    <p>I'm {user.name.firstname}. I enjoy creating user-centric, delightful and human experiences.</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={9} lg={9} md={12} sm={12} col={12}>
            <Card className="h-100">
              <Card.Body>
                {editMode ? (
                  <Form>
                    <Row className="gutters">
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <Form.Group>
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            placeholder="Enter first name"
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <Form.Group>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            placeholder="Enter last name"
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter email"
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <Form.Group>
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <Form.Group>
                          <Form.Label>Street</Form.Label>
                          <Form.Control
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            placeholder="Enter street"
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <Form.Group>
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Enter city"
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <Form.Group>
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="Enter state"
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <Form.Group>
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            placeholder="Enter zip code"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="gutters">
                      <Col xl={12} lg={12} md={12} sm={12} col={12}>
                        <div className="text-right">
                          <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
                          <Button variant="primary" onClick={handleSave}>Update</Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                ) : (
                  <div className="profile-info">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                    <Row className="gutters">
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <p><strong>First Name:</strong> {user.name.firstname}</p>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <p><strong>Last Name:</strong> {user.name.lastname}</p>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <p><strong>Email:</strong> {user.email}</p>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <p><strong>Phone:</strong> {user.phone}</p>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <p><strong>Street:</strong> {user.address.street}</p>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <p><strong>City:</strong> {user.address.city}</p>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <p><strong>State:</strong> {user.address.state || ''}</p>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={6} col={12}>
                        <p><strong>Zip Code:</strong> {user.address.zip || ''}</p>
                      </Col>
                    </Row>
                    <div className="text-right edit-button">
                      <Button variant="primary" onClick={() => setEditMode(true)}>Edit</Button>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;
