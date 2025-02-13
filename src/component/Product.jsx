import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import '../component/User/UserStyle/Product.css';

function Product() {
  const [listProduct, setListProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [cateID, setCateID] = useState(0);
  const [start] = useState(0);
  const [limit, setLimit] = useState(6);
  const [brandID, setBrandID] = useState(0);
  const [sortOption, setSortOption] = useState("best-sellers");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [cateID, search, sortOption, limit]);

  const fetchProducts = () => {
    let url = cateID 
      ? `http://localhost:9999/products/?category=${cateID}&_start=${start}&_limit=${limit}` 
      : `http://localhost:9999/products?_start=${start}&_limit=${limit}`;
    
    fetch(url)
      .then(res => res.json())
      .then(result => {
        let searchResult = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
        searchResult = sortProducts(searchResult);
        setListProduct(searchResult);
      });
  };

  const fetchCategories = () => {
    fetch("http://localhost:9999/categories")
      .then((res) => res.json())
      .then((result) => setCategories(result));
  };

  const handleCategoryChange = (e) => {
    setCateID(Number(e.target.value));
    setLimit(6);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleLoadMore = () => {
    setLimit(limit + 6);
  };

  const sortProducts = (products) => {
    switch (sortOption) {
      case "az":
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case "za":
        return products.sort((a, b) => b.title.localeCompare(a.title));
      case "low-high":
        return products.sort((a, b) => a.price - b.price);
      case "high-low":
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const cardItem = (item) => {
    return (
      <Col xs={12} sm={6} md={viewMode === 'grid' ? 4 : 12} className="d-flex align-items-stretch" key={item.id}>
        <div className={`card my-3 ${viewMode === 'list' ? 'flex-row' : ''}`} style={{ width: "100%" }}>
          <NavLink to={`/products/${item.id}`}>
            <img
              src={process.env.PUBLIC_URL + `/assets/images/products/${item.image}`}
              className="card-img-top"
              alt={item.title}
              style={{ height: "250px", objectFit: "contain" }}
            />
          </NavLink>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-muted">{item.title}</h5>
            <p className="card-text text-muted" style={{ fontSize: "20px" }}>
              {categories.find(c => c.cateid === item.category)?.name}
            </p>
            <p className="card-text text-muted fw-bold">{(item.price * 24000).toLocaleString()} VND</p>
            <NavLink to={`/products/${item.id}`} className="btn btn-dark mt-auto">
              Buy Now
            </NavLink>
          </div>
        </div>
      </Col>
    );
  };

  return (
    <Container fluid className="py-5">
      <h1 className="mb-0">Products</h1>
      <Row>
        <Col lg={3} className="mb-4">
          <h5>Shop by Category</h5>
          <ul className="list-unstyled">
            <li className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                value={0}
                checked={cateID === 0}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label">All Categories</label>
            </li>
            {categories.map((category) => (
              <li className="form-check" key={category.cateid}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  value={category.cateid}
                  checked={cateID === category.cateid}
                  onChange={handleCategoryChange}
                />
                <label className="form-check-label">{category.name}</label>
              </li>
            ))}
          </ul>
        </Col>
        <Col lg={9}>
          <Row className="product-grid">{listProduct.map(cardItem)}</Row>
          <div className="text-center mt-4">
            <Button variant="outline-dark" onClick={handleLoadMore}>Load More</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Product;
