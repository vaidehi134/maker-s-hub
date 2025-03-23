import React, { useEffect, useState } from "react";
import StorageService from "../../../../util/StorageService";
import { CrafterService } from "../../service/CrafterService";
import styles from "./CrafterWork.module.css";
import { Modal, notification, Rate } from "antd";
import { useNavigate } from "react-router-dom";

const CrafterWork = () => {
  const [posts, setPosts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [ratings, setRatings] = useState({}); // FIXED: Change from array to object
  const navigate = useNavigate();
  const crafterId = StorageService.getUserId();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState({
    rating: 0,
    feedback: "",
  });

  const showReviewModal = (postId) => {
    setSelectedReview(
      ratings[postId] || { rating: 0, feedback: "No feedback" }
    );
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    findWorkByCrafterId(crafterId);
  }, [crafterId]);

  useEffect(() => {
    posts.forEach((post) => {
      getClientReviews(post.id); // FIXED: Call getClientReviews instead of getRatings
    });
  }, [posts]);

  const findWorkByCrafterId = async (crafterId) => {
    try {
      const response = await CrafterService.getWorkByCrafterId(crafterId);
      if (response.status === 200) {
        setPosts(response.data);
        setSelectedStatus(
          response.data.reduce((acc, post) => {
            acc[post.id] = post.postStatus;
            return acc;
          }, {})
        );
      } else {
        notification.error({
          message: "Error fetching Posts",
          description: response.data.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      notification.error({
        message: "Error fetching Posts",
        description: error.message || "Something went wrong",
      });
    }
  };

  const getClientReviews = async (postId) => {
    try {
      const response = await CrafterService.getClientReviews(crafterId, postId);
      if (response.status === 200) {
        setRatings((prevRatings) => ({
          ...prevRatings,
          [postId]: {
            rating: response.data.rating || 0, // Ensure rating is a number
            feedback: response.data.clientFeedback || "No feedback",
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
      setRatings((prevRatings) => ({
        ...prevRatings,
        [postId]: { rating: 0, feedback: "No feedback" }, // Ensure default structure
      }));
    }
  };

  const handleSeeDetailsClick = (postId) => {
    navigate(`/crafter/see-details/${postId}`);
  };

  const handleStatusChange = (postId, status) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [postId]: status,
    }));
    handleStatusUpdate(postId, status);
  };

  const handleCancelRequest = async (postId) => {
    try {
      const response = await CrafterService.cancelRequestForPost(
        postId,
        crafterId
      );
      if (response && response.status === 200) {
        notification.success({
          message: "Your request was canceled successfully",
        });
        navigate(`/crafter-all-posts`);
      } else {
        notification.error({
          message: "Error canceling request",
          description: response?.data?.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error canceling request:", error);
      notification.error({
        message: "Error canceling request",
        description: error.message || "Something went wrong",
      });
    }
  };

  const handleStatusUpdate = async (postId, status) => {
    try {
      const response = await CrafterService.updatePostStatus(status, postId);
      if (response.status === 200) {
        findWorkByCrafterId(crafterId);
      } else {
        notification.error({
          message: "Error updating status",
          description: response.data.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      notification.error({
        message: "Error updating status",
        description: error.message || "Something went wrong",
      });
    }
  };

  const uploadCrafterWork = (postId) => {
    navigate(`/crafter/upload-crafter-work/${postId}`);
  };

  return (
    <div>
      <h1 className={styles.crafterWorkHeading}>Your Work</h1>
      {posts.length === 0 ? (
        <h1 className={styles.noPostAvailable}>No Work Available</h1>
      ) : (
        <div className={styles.postList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              <div className={styles.postContent}>
                <div className={styles.postImage}>
                  {post.imageDetails && post.imageDetails.length > 0 && (
                    <img
                      className="post-image"
                      src={post.imageDetails[0].imgUrl}
                      alt={`Post ${post.id} Image`}
                      onError={(e) => {
                        e.target.src = "/path/to/placeholder-image.jpg";
                      }}
                    />
                  )}
                </div>
                <div className="post-details">
                  <h2 className="post-title">{post.itemName}</h2>
                </div>

                {["ASSIGNED", "IN_PROGRESS", "COMPLETED"].includes(
                  post.postStatus
                ) && (
                  <div className={styles.postAction}>
                    <button
                      className={styles.updateButton}
                      onClick={() => handleSeeDetailsClick(post.id)}
                    >
                      See Details
                    </button>
                  </div>
                )}

                {post.postStatus === "PAID" && (
                  <div className={styles.postAction}>
                    <p>
                      Congratulations! Your payment has been successfully
                      received. Thank you for your hard work!
                    </p>
                    {ratings[post.id]?.rating ? (
                      <>
                        <button onClick={() => showReviewModal(post.id)}>
                          See Reviews
                        </button>
                      </>
                    ) : (
                      <p className={styles.notRated}>Not rated by client</p>
                    )}
                    <button
                      onClick={() =>
                        handleStatusChange(post.id, "PAYMENT_ACKNOWLEDGED")
                      }
                    >
                      Acknowledge Payment
                    </button>
                  </div>
                )}

                

                {post.postStatus === "PAYMENT_ACKNOWLEDGED" && (
                  <div className={styles.postAction}>
                    {ratings[post.id]?.rating ? (
                      <>
                         <p>You have acknowledged payment</p>
                        <button onClick={() => showReviewModal(post.id)}>
                          See Reviews
                        </button>
                      </>
                    ) : (
                      <p className={styles.notRated}>Not rated by client</p>
                    )}
                  </div>
                )}

                {/* <div className={styles.statusUpdate}> */}
                
                  {post.postStatus === "AWAITING_PAYMENT" ? (
                      <div className={styles.postAction}>
                      {ratings[post.id]?.rating ? (
                        <>
                          <button onClick={() => showReviewModal(post.id)}>
                            See Reviews
                          </button>
                        </>
                      ) : (
                        <p className={styles.notRated}>Not rated by client</p>
                      )}

                      <p>You have not received payment yet</p>
                    </div>
                  ) : (
                     <div className={styles.postAction}>
                      {(post.postStatus === "ASSIGNED" ||
                        post.postStatus === "IN_PROGRESS") && (
                        <button
                          type="button"
                          onClick={() => handleCancelRequest(post.id)}
                        >
                          Cancel Request
                        </button>
                      )}

                      {post.postStatus === "COMPLETED" && (
                        <button
                          type="button"
                          className={styles.updateButton}
                          onClick={() => uploadCrafterWork(post.id)}
                        >
                          Upload your work
                        </button>
                      )}

                      
                      {["ASSIGNED", "IN_PROGRESS", "COMPLETED"].includes(
                        post.postStatus
                      ) && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleStatusUpdate(
                              post.id,
                              selectedStatus[post.id]
                            );
                          }}
                        >
                          <label>
                            <input
                              type="radio"
                              name={`status-${post.id}`}
                              value="IN_PROGRESS"
                              checked={
                                selectedStatus[post.id] === "IN_PROGRESS"
                              }
                              onChange={() =>
                                handleStatusChange(post.id, "IN_PROGRESS")
                              }
                            />
                            In Progress
                          </label>
                          <label>
                            <input
                              type="radio"
                              name={`status-${post.id}`}
                              value="COMPLETED"
                              checked={selectedStatus[post.id] === "COMPLETED"}
                              onChange={() =>
                                handleStatusChange(post.id, "COMPLETED")
                              }
                            />
                            Completed
                          </label>
                        </form>
                      )}
                    </div>
                  )}
                  {/* */}
               
              </div>
            </div>
          ))}

          <Modal
            title="Client Review"
            open={isModalVisible}
            onCancel={handleCloseModal}
            footer={null}
          >
            <Rate disabled allowHalf value={selectedReview.rating} />
            <p> {selectedReview.feedback}</p>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default CrafterWork;
