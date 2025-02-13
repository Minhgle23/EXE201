import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style/HomeReco.css";

function HomeReco() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cateID, setCateID] = useState(2);
  const [start] = useState(0);
  const [limit] = useState(4);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [cateID]);

  const fetchProducts = () => {
    let url = `http://localhost:9999/products/?category=${cateID}&_start=${start}&_limit=${limit}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => setProduct(result));
  };

  const fetchCategories = () => {
    fetch("http://localhost:9999/categories")
      .then((res) => res.json())
      .then((result) => setCategories(result));
  };

const handleCategoryClick = (id) => {
    setCateID(id);
  };

  const cardItem = (item) => {
    return (
      <Col md={3} className="d-flex align-items-stretch" key={item.id}>
        <Card className="product-card my-3">
          <Link to={`/products/${item.id}`}>
            <Card.Img
              variant="top"
              src={`/assets/images/products/${item.image}`}
              alt={item.title}
              className="product-img"
            />
          </Link>
          <Card.Body className="text-center">
            <Card.Title className="product-title">{item.title}</Card.Title>
            <Card.Text className="lead">${item.price}</Card.Text>
            <Link to={`/products/${item.id}`} className="btn btn-outline-dark">
              Buy Now
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  };


  return (
    <Container className="mt-5">
      <Row className="justify-content-center text-center mb-4">
        <Col>
          <h1 className="mb-4">Categories</h1>
          <Nav className="justify-content-center" variant="pills">
            {categories.map((category) => (
              <Nav.Item key={category.cateid}>
                <Nav.Link
                  className="category-link"
                  onClick={() => handleCategoryClick(category.cateid)}
                  active={cateID === category.cateid}
                >
                  {category.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
      </Row>
      <Row>{product.map(cardItem)}</Row>
    </Container>
  );
}

export default HomeReco;
