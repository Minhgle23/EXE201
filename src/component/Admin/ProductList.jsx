// src/pages/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  useEffect(() => {
    fetch('http://localhost:9999/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:9999/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setProducts(products.filter(product => product.id !== id));
          toast.success('Product deleted successfully!');
        } else {
          toast.error('Failed to delete product!');
        }
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product!');
      });
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  return (
    <div className="container mt-4">
      <h2>Product List</h2>
      <Form inline className="mb-3">
        <FormControl
          type="text"
          placeholder="Search products"
          className="mr-sm-2"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link to="/manage/add-product" className="btn btn-primary">Add Product</Link>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id}>
              {/* <td>{product.id}</td> */}
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td><img src={`/assets/images/products/${product.image}`} alt={product.title} style={{ width: '50px' }} /></td>
              <td>
                <Link to={`/manage/product/edit/${product.id}`} className="btn btn-warning mr-2"style={{marginRight: '10px'}}>Edit</Link>
                <Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(totalPages).keys()].map(pageNumber => (
          <button
            key={pageNumber + 1}
            onClick={() => paginate(pageNumber + 1)}
            className={currentPage === pageNumber + 1 ? 'active' : ''}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
