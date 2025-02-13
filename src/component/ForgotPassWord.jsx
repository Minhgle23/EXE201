import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import '../component/common/style/ForgotPassword.css';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:9999/users";

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    // Check if the email exists in the database and update the password
    fetch(url)
      .then((response) => response.json())
      .then((users) => {
        const user = users.find((user) => user.email === formData.email);

        if (user) {
          fetch(`${url}/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: formData.newPassword,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              toast.success("Password reset successful!");
              setTimeout(() => {
                navigate("/login"); // Redirect to login page
              }, 2000); // Delay to allow the user to see the success message
            })
            .catch((error) => {
              console.error("Error:", error);
              toast.error("Failed to reset password!");
            });
        } else {
          toast.error("Email not found! Please check your email and try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error finding user!");
      });
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <div className="forgot-password-container">
        <Row className="g-0">
          <Col md={6} className="p-4">
            <h2 className="text-center mb-4">Forgot Password</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 forgot-password-btn">
                Save New Password
              </Button>
            </Form>
            <p className="text-center mt-3">
              <a href="/login" className="back-to-login-link"><i className="fa fa-arrow-left"></i> Back to Login</a>
            </p>
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <img src="./assets/images/signin/fpw-image.jpg" alt="Forgot Password" className="img-fluid" />
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default ForgotPassword;
