import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import CartContext from './CartContext';

const Verify = () => {
  const [user, setUser] = useState(null);
  const { totalPrice, clearCart } = useContext(CartContext);
  
  const localCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [verifiedUser, setVerifiedUser] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    city: '',
    street: ''
  });
  console.log(verifiedUser);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    if (storedUser) {
      setUser(storedUser);
      setVerifiedUser({
        id: storedUser.id || '',
        firstname: storedUser.name?.firstname,
        lastname: storedUser.name?.lastname,
        email: storedUser.email,
        phone: storedUser.phone,
        city: storedUser.address?.city,
        street: storedUser.address?.street
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerifiedUser({
      ...verifiedUser,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (localCart.length === 0) {
      alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng.");
      navigate('/');
      return;
    }

    const sendRequest = async () => {

      try {
        const customerInfo = {
          id: verifiedUser.id || '',
          name: {
            firstname: verifiedUser.firstname,
            lastname: verifiedUser.lastname
          },
          email: verifiedUser.email,
          phone: verifiedUser.phone,
          address: {
            city: verifiedUser.city,
            street: verifiedUser.street
          }
        };
        const date = moment().format('YYYY-MM-DD');

        const response = await axios.post(`http://localhost:5000/api/create_payment_url`, {
          amount: totalPrice * 24000,
          bankCode: "ncb",
          language: "vn",
          customer: customerInfo,
          products: localCart
        });
        window.location.href = `${response.data.redirectUrl}`;
      } catch (error) {
        alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    };

    sendRequest();
  };

  return (
    <Container>
      <h1 className="text-center">Verify</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={verifiedUser.firstname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={verifiedUser.lastname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={verifiedUser.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={verifiedUser.street}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={verifiedUser.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={verifiedUser.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className="btn btn-primary m-3">
          Verify
        </Button>
      </Form>
    </Container>
  );
};

export default Verify;
