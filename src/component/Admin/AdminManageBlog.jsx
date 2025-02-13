import { useEffect, useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./AdminStyle/ManageBlog.css";

function AdminManageBlog() {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/blog")
      .then((res) => res.json())
      .then((result) => setBlogList(result));
  }, []);

  const updateStatus = (id, currentStatus) => {
    const newStatus = !currentStatus;
    const blogToUpdate = blogList.find((blog) => blog.id === id);
    if (!blogToUpdate) return;

    const updatedBlog = { ...blogToUpdate, status: newStatus };

    fetch(`http://localhost:9999/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBlog),
    })
      .then((res) => res.json())
      .then((updatedBlogFromServer) => {
        setBlogList((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === id ? updatedBlogFromServer : blog
          )
        );
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      fetch(`http://localhost:9999/blog/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setBlogList((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        });
    }
  };

  return (
    <Container>
      <h2>Blog List</h2>
      <Button variant="primary" href="/manage/add-blog">Add New</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogList.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{format(new Date(blog.dateCreate), 'yyyy-MM-dd')}</td>
              <td>
                <img className="blog-image2" src={process.env.PUBLIC_URL + `/assets/images/blog/${blog.image}`} alt={blog.title} width="100" />
              </td>
              <td>
                <Button
                  variant={blog.status ? "success" : "danger"}
                  onClick={() => updateStatus(blog.id, blog.status)}
                >
                  {blog.status ? "Active" : "Inactive"}
                </Button>
              </td>
              <td>
                <Link to={`/manage/blog/edit/${blog.id}`} className="btn btn-info" style={{ color: 'white' }}>Edit</Link>{' '}
                <Button variant="danger" onClick={() => handleDelete(blog.id)} style={{ color: 'white' }}>Delete</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminManageBlog;
