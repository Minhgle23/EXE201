import React, { useEffect, useState } from "react";
import Rating from './Rating';

const CommentSection = ({ productId, user, isAuthenticated }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentStates, setEditCommentStates] = useState({});
  const [review, setReview] = useState(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:9999/reviews?productId=${productId}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.length > 0) {
            setComments(json[0].comments || []);
            setReview(json[0]);
            if (user && user.id) {
              const userRating = json[0].ratings.find(r => r.userId === user.id);
              setUserRating(userRating ? userRating.rate : 0);
            }
          } else {
            setComments([]);
            setReview(null);
            setUserRating(0);
          }
        })
        .catch(error => {
          console.error("Error fetching reviews:", error);
          setComments([]);
          setReview(null);
          setUserRating(0);
        });
    }
  }, [productId, user]);

  const handleAddComment = () => {
    if (!isAuthenticated || !user) {
      alert("You must be logged in to comment.");
      return;
    }

    if (!newComment.trim()) {
      alert("Comment cannot be empty or contain special characters.");
      return;
    }

    let tempid = new Date().getTime()
    const newCommentObject = {
      id: tempid.toString(),

      text: newComment,
      userId: user.id,
      username: user.username,
      date: new Date().toLocaleDateString()
    };


    fetch(`http://localhost:9999/reviews?productId=${productId}`)
      .then(res => res.json())
      .then(reviews => {
        if (reviews.length > 0) {
          const review = reviews[0];
          const updatedComments = [...(review.comments || []), newCommentObject];
          review.comments = updatedComments;

          fetch(`http://localhost:9999/reviews/${review.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
          })
            .then((res) => res.json())
            .then(() => {
              setComments(updatedComments);
              setNewComment("");
            });
        } else {

          let tempid = new Date().getTime();
          const newReview = {
            id: tempid.toString(),
            productId: productId,
            ratings: [],
            comments: [newCommentObject]
          };

          fetch(`http://localhost:9999/reviews`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
          })
            .then((res) => res.json())
            .then(() => {
              setComments([newCommentObject]);
              setNewComment("");
              setReview(newReview);
            });
        }
      });
  };

  const handleEditComment = (id) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (!commentToEdit) {
      alert("Comment not found.");
      return;
    }

    if (user.id !== commentToEdit.userId) {
      alert("You are not authorized to edit this comment.");
      return;
    }

    setEditCommentStates(prevState => ({
      ...prevState,
      [id]: commentToEdit.text
    }));
  };

  const handleSaveComment = (id) => {
    const updatedComments = comments.map((comment) => 
      comment.id === id ? { ...comment, text: editCommentStates[id] } : comment
    );

    const updatedReview = { ...review, comments: updatedComments };

    fetch(`http://localhost:9999/reviews/${review.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    })
      .then((res) => res.json())
      .then(() => {
        setComments(updatedComments);
        setEditCommentStates(prevState => {
          const newState = {...prevState};
          delete newState[id];
          return newState;
        });
      });
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    const updatedReview = { ...review, comments: updatedComments };

    fetch(`http://localhost:9999/reviews/${review.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    })
      .then((res) => res.json())
      .then(() => {
        setComments(updatedComments);
      });
  };

  const handleRatingChange = (newRating) => {
    if (!isAuthenticated || !user) {
      alert("You must be logged in to rate.");
      return;
    }

    if (!review) {
      console.error("Review not found");
      return;
    }

    let updatedRatings = review.ratings || [];
    if (updatedRatings.some(r => r.userId === user.id)) {
      updatedRatings = updatedRatings.map(r => 
        r.userId === user.id ? { ...r, rate: newRating } : r
      );
    } else {
      updatedRatings = [...updatedRatings, { userId: user.id, rate: newRating }];
    }

    const updatedReview = { ...review, ratings: updatedRatings };

    fetch(`http://localhost:9999/reviews/${review.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    })
      .then((res) => res.json())
      .then(() => {
        setReview(updatedReview);
        setUserRating(newRating);
      })
      .catch((error) => {
        console.error("Error updating rating:", error);
        alert("Failed to update rating. Please try again.");
      });
  };

  const calculateAverageRating = () => {
    if (!review || !review.ratings || review.ratings.length === 0) return 0;
    const sum = review.ratings.reduce((acc, curr) => acc + curr.rate, 0);
    return sum / review.ratings.length;
  };

  return (
    <section className="comment-section">
      <div className="container my-5 py-5 text-body">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-10 col-xl-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="text-body mb-0">Comments ({comments.length})</h4>
              {review && isAuthenticated && user && (
                <div className="d-flex align-items-center">
                  <span className="me-2">Your Rating:</span>
                  <Rating 
                    rating={userRating} 
                    onRatingChange={handleRatingChange}
                    editable={isAuthenticated}
                  />
                  <span className="ms-2">Average Rating: {calculateAverageRating().toFixed(1)}</span>
                </div>
              )}
            </div>
            {comments.map((c) => (
              <div key={c.id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex flex-start">
                    <img
                      className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
                      alt="avatar"
                      width="40"
                      height="40"
                    />
                    <div className="w-100">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="text-primary fw-bold mb-0">
                          {c.username}
                          <span className="text-body ms-2">{c.text}</span>
                        </h6>
                        <p className="mb-0">{c.date}</p>
                      </div>
                      {isAuthenticated && user && user.id === c.userId && (
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="small mb-0" style={{ color: "#aaa" }}>
                            <a href="#!" className="link-grey" onClick={() => handleDeleteComment(c.id)}>
                              Remove
                            </a>{" "}
                            <a href="#!" className="link-grey" onClick={() => handleEditComment(c.id)}>
                              Edit
                            </a>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {editCommentStates.hasOwnProperty(c.id) && (
                    <div className="mt-3">
                      <textarea
                        value={editCommentStates[c.id]}
                        onChange={(e) => setEditCommentStates(prevState => ({
                          ...prevState,
                          [c.id]: e.target.value
                        }))}
                      />
                      <button className="save" onClick={() => handleSaveComment(c.id)}>Save</button>
                      <button className="cancel" onClick={() => setEditCommentStates(prevState => {
                        const newState = {...prevState};
                        delete newState[c.id];
                        return newState;
                      })}>Cancel</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isAuthenticated && user && (
              <div>
                <textarea
                  id="newComment"
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button className="btn btn-primary" onClick={handleAddComment}>
                  Add Comment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;