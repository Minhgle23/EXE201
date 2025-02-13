import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AdminStyle/AdminCreateBlog.css";

function AdminEditBlog() {
  const [image, setUpdatedImage] = useState("/img/posts/image_null.png");
  const [imageName, setImageName] = useState("");
  const [title, setUpdatedTitle] = useState("");
  const [data, setUpdatedData] = useState("");
  const [brief, setBrief] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:9999/blog/${id}`)
      .then((res) => res.json())
      .then((blog) => {
        setUpdatedTitle(blog.title);
        setUpdatedData(blog.data);
        setBrief(blog.brief);
        setImageName(blog.image);
        setUpdatedImage(process.env.PUBLIC_URL + `/assets/images/blog/${blog.image}`);
      });
  }, [id]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setUpdatedImage(imageUrl);
      setImageName(selectedFile.name);
    }
  };

  const handleSaveDataClick = (e) => {
    e.preventDefault();

    if (title === "" || data === "" || imageName === "") {
      alert("Enter all fields before submit");
      return;
    }

    const blogPost = {
      id: id,
      title: title,
      data: data,
      brief: brief,
      image: imageName,
      dateCreate: new Date().toISOString(),
      status: true,
    };

    fetch(`http://localhost:9999/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogPost),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(() => {
        alert("Successfully updated the blog post!");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error updating blog post:", error);
      });
  };

  return (
    <div className="create-post-container">
      <div className="row justify-content-center">
        <div className="col-md-6 title">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="col-md-3"></div>
      </div>
      <div className="row content-container">
        <div className="col-md-9 data">
          <input
            type="text"
            placeholder="Enter brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            required
            className="form-control"
          />
          <ReactQuill
            theme="snow"
            value={data}
            onChange={setUpdatedData}
            placeholder="Write your blog content here..."
            required
            style={{ height: '500px' }}
          />
        </div>
        <div className="col-md-3 sidebar">
          <div className="preview-image">
            {image === "/img/posts/image_null.png" ? (
              <div className="image-placeholder">Choose an image</div>
            ) : (
              <img
                src={image}
                alt="Preview"
                className="create-post-image-preview"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="inputImage"
              required
            />
          </div>
          <div className="col-md-3">
            <button onClick={handleSaveDataClick} className="create-post-button">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminEditBlog;
