import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { Container, Card } from 'react-bootstrap';
import './UserStyle/BlogDetail.css';

function BlogDetail() {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        fetch(`http://localhost:9999/blog/${blogId}`)
            .then(res => res.json())
            .then(result => setBlog(result));
    }, [blogId]);

    return (
        <Container className="my-5 blog-detail-container">
            <Card className="border-0 shadow-lg blog-card">
                {blog.image && (
                    <Card.Img
                        variant="top"
                        src={`/assets/images/blog/${blog.image}`}
                        alt={blog.title}
                        className="img-fluid rounded-top blog-image"
                    />
                )}
                <Card.Body className="p-4">
                    {blog.title && <Card.Title className="blog-title">{blog.title}</Card.Title>}
                    {blog.dateCreate && (
                        <Card.Subtitle className="blog-date">
                            {format(new Date(blog.dateCreate), "dd MMMM, yyyy")}
                        </Card.Subtitle>
                    )}
                    <div className="blog-content">
                        <ReactQuill
                            value={blog.data}
                            readOnly={true}
                            theme={"bubble"}
                            className="react-quill-custom"
                        />
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default BlogDetail;