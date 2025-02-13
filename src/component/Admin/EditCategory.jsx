// src/pages/EditCategory.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:9999/categories/${id}`)
      .then(response => response.json())
      .then(data => setName(data.name))
      .catch(error => console.error('Error fetching category:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCategory = { name };

    fetch(`http://localhost:9999/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCategory),
    })
      .then(response => {
        if (response.ok) {
          toast.success("Category updated successfully!");
        } else {
          toast.error("Failed to update category!");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error("Failed to update category!");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Update Category</button>
        <Link to="/manage/categories" className="btn btn-secondary ml-2">Cancel</Link>
      </form>
    </div>
  );
};

export default EditCategory;
