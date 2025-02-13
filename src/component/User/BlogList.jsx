import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import './UserStyle/BlogList.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const blogsPerPage = 4;

    useEffect(() => {
        fetch('http://localhost:9999/blog')
            .then(res => res.json())
            .then(result => {
                // Filter out blogs with status false
                const validBlogs = result.filter(blog => blog.status !== false);
                setFilteredBlogs(validBlogs);
                setTotalBlogs(validBlogs.length);
                setBlogs(validBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage));
            });
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(totalBlogs / blogsPerPage);
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                    {number}
                </Pagination.Item>
            );
        }
        return (
            <Pagination>
                {items}
            </Pagination>
        );
    };

    return (
        <section className="home-blog-section">
            <div className="container">
                <h1 className="home-blog-title">All Blogs</h1>
                <div className="row">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="col-md-3 mb-4">
                            <div className="home-blog-entry">
                                <Link to={`/blogs/${blog.id}`} className="home-blog-img-link">
                                    <div className="home-blog-image-container">
                                        <img src={`/assets/images/blog/${blog.image}`} alt={blog.title} className="home-blog-img-large" />
                                    </div>
                                    <h2 className="home-blog-post-title">{blog.title}</h2>
                                </Link>
                                <p>{blog.brief}</p>
                                <span className="home-blog-date">
                                    {/* {format(new Date(blog.dateCreate), 'dd-MM-yyyy')} */}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                        {renderPagination()}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogList;
