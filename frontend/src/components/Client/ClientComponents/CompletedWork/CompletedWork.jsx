import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClientService } from "../../Services/ClientService";
import { notification, Rate } from "antd";
import styles from "./CompletedWork.module.css";

const CompletedWork = () => {
  const [workImages, setWorkImages] = useState([]);
  const [crafterComment, setCrafterComment] = useState("");
  const [rating, setRating] = useState(0);
  const [clientFeedback, setClientFeedback] = useState("");
  const { postId, crafterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCompletedWork();
  }, [postId, crafterId]);

  const getCompletedWork = async () => {
    try {
      const response = await ClientService.getCompletedWork(crafterId, postId);
      setWorkImages(response.data.imageDetails || []);
      setCrafterComment(response.data.comment || "No comment provided.");
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an error fetching the completed work images.",
      });
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (event) => {
    setClientFeedback(event.target.value);
  };

  const postRatingsByPostId = async () => {
    try {
      const clientReviewData = {
        rating,
        clientFeedback,
      };

      const response = await ClientService.postRatingsByPostId(
        postId,
        clientReviewData
      );
      if (response.status === 200) {
        notification.success({
          message: "Ratings and Feedback submitted successfully",
        });
        navigate("/all-posts");
      } else {
        notification.error({
          message: "Error submitting review",
          description: response.data.message || "Something went wrong",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an error submitting your review",
      });
    }
  };

  return (
    <div className={styles.completedWorkContainer}>
      <h2 className={styles.completedWorkHeading}>Showcased Creations</h2>
      <div className={styles.completedWorkImageGrid}>
        {workImages.length > 0 ? (
          workImages.map((image, index) => (
            <div key={index} className={styles.completedWorkImageCard}>
              <img
                src={image.imgUrl}
                alt={`Completed work ${index + 1}`}
                className={styles.completedWorkImage}
              />
            </div>
          ))
        ) : (
          <p className={styles.completedWorkNoImages}>No images found.</p>
        )}
      </div>

      {workImages.length > 0 && (
        <div className={styles.completedWorkDetailsSection}>
          <h3 className={styles.completedWorkCommentTitle}>
            Crafter's Comment
          </h3>
          <p className={styles.completedWorkComment}>{crafterComment}</p>

          <h3 className={styles.completedWorkRatingTitle}>
            Rate This Creation
          </h3>
          <Rate
            className={styles.completedWorkStarRating}
            value={rating}
            onChange={handleRatingChange}
          />

          {/* Client Feedback Input */}
          <textarea
            className={styles.completedWorkFeedbackInput}
            placeholder="Leave your feedback here..."
            value={clientFeedback}
            onChange={handleFeedbackChange}
          />

          <button
            className={styles.completedWorkSubmitButton}
            type="submit"
            onClick={postRatingsByPostId}
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
};

export default CompletedWork;


