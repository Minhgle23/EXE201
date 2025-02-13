// src/pages/CategoryList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';


const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 6;

  useEffect(() => {
    fetch('http://localhost:9999/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:9999/categories/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setCategories(categories.filter(category => category.id !== id));
          toast.success('Category deleted successfully!');
        } else {
          toast.error('Failed to delete category!');
        }
      })
      .catch(error => {
        console.error('Error deleting category:', error);
        toast.error('Failed to delete category!');
      });
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

//   const indexOfLastCategory = currentPage * categoriesPerPage;
//   const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
//   const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  return (
    <div className="container mt-4">
      <h2>Category List</h2>
      <Form inline className="mb-3">
        <FormControl
          type="text"
          placeholder="Search categories"
          className="mr-sm-2"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link to="/manage/add-category" className="btn btn-primary">Add Category</Link>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map(category => (
            <tr key={category.id}>
              {/* <td>{category.cateid}</td> */}
              <td>{category.name}</td>
              <td>
                <Link to={`/manage/category/edit/${category.id}`} className="btn btn-warning mr-2" style={{ marginRight: '10px' }}>Edit</Link>
                <Button variant="danger" onClick={() => handleDelete(category.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <div className="pagination">
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
      </div> */}
    </div>
  );
};

export default CategoryList;
