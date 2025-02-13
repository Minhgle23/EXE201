// src/pages/EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    quantity: '',
    image: '',
  });

  useEffect(() => {
    console.log(`http://localhost:9999/products/${id}`);
    fetch(`http://localhost:9999/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);
console.log(product);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9999/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then(response => {
        if (response.ok) {
          toast.success('Product updated successfully!');
        } else {
          toast.error('Failed to update product!');
        }
      })
      .catch(error => {
        console.error('Error updating product:', error);
        toast.error('Failed to update product!');
      });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="number"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Product</button>
        <Link to="/manage/product" className="btn btn-secondary link-cancle">Cancel</Link>
      </form>
    </div>
  );
};

export default EditProduct;
