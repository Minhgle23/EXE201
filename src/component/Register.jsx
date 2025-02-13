  import React, { useState } from "react";
  import { Form, Button, Container, Row, Col } from "react-bootstrap";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { useNavigate } from "react-router-dom";
  import '../component/common/style/Register.css';

  const RegistrationForm = () => {
    const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      city: "",
      street: "",
      phone: "",
      role: "USER",
      re_password: "",
      agree_term: false,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const url = "http://localhost:9999/users";

      if (formData.password !== formData.re_password) {
        toast.error("Passwords do not match!");
        return;
      }

      if (!formData.agree_term) {
        toast.error("Please agree to the Terms of Service!");
        return;
      }

      // Fetch existing users to check for duplicates
      fetch(url)
        .then((response) => response.json())
        .then((users) => {
          const emailExists = users.some((user) => user.email === formData.email);
          const usernameExists = users.some(
            (user) => user.username === formData.username
          );

          if (emailExists) {
            toast.error("Email already exists!");
            return;
          }

          if (usernameExists) {
            toast.error("Username already exists!");
            return;
          }

          if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long!");
            return;
          }

          // Proceed with registration
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              address: {
                city: formData.city,
                street: formData.street,
              },
              email: formData.email,
              username: formData.username,
              password: formData.password,
              name: {
                firstname: formData.firstname,
                lastname: formData.lastname,
              },
              phone: formData.phone,
              role: formData.role,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              toast.success("Registration successful!");
              setTimeout(() => {
                navigate("/login"); // Redirect to login page after successful registration
              }, 2000); // Delay to allow the user to see the success message
            })
            .catch((error) => {
              console.error("Error:", error);
              toast.error("Registration failed!");
            });
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error checking existing users!");
        });
    };

    return (
      <Container fluid className="d-flex align-items-center justify-content-center vh-100">
        <div className="signup-container">
          <Row className="g-0">
            <Col md={6} className="p-4">
              <h2 className="text-center mb-4">Sign up</h2>
              <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="UserName"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
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
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    name="re_password"
                    placeholder="Repeat your password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                />
              </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="agree_term"
                    id="agree-term"
                    label={
                      <span>
                        I agree all statements in{" "}
                        <a href="/" className="terms-link">Terms of service</a>
                      </span>
                    }
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 register-btn">
                  Register
                </Button>
              </Form>
              <p className="text-center mt-3">
                <a href="/login" className="member-link">I am already member</a>
              </p>
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-center">
              <img src="./assets/images/signin/signup-image.jpg" alt="Signup" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <ToastContainer />
      </Container>
    );
  };

  export default RegistrationForm;