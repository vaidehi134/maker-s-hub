import React, { useEffect, useState } from "react";
import StorageService from "../../../../util/StorageService";
import { CrafterService } from "../../service/CrafterService";
import styles from "./CrafterWork.module.css";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const CrafterWork = () => {
  const [posts, setPosts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  const getImageSrc = (imgUrl) => imgUrl;
  const navigate = useNavigate();

  const crafterId = StorageService.getUserId();

  useEffect(() => {
    findWorkByCrafterId(crafterId);
  }, [crafterId]);

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
      navigate(`/crafter-all-posts`);
      console.log("handleCancelRequest: response =>", response);
      if (response && response.status === 200) {
        notification.success({
          message: "Your request was canceled successfully",
        });
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
        console.log("Your post satus got updated");
        findWorkByCrafterId(crafterId); // Refetch posts to update the status
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

  return (
    <div>
      {posts.length === 0 ? (
        <h1 className={styles.noPostAvailable}>No Posts Available</h1>
      ) : (
        <div className={styles.postList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              <div className={styles.postContent}>
                <div className={styles.postImage}>
                  {post.imageDetails && post.imageDetails.length > 0 && (
                    <img
                      className="post-image"
                      src={getImageSrc(post.imageDetails[0].imgUrl)}
                      alt={`Post ${post.id} Image 1`}
                      onError={(e) => {
                        e.target.src = "/path/to/placeholder-image.jpg";
                      }}
                    />
                  )}
                </div>
                <div className="post-details">
                  <h2 className="post-title">{post.itemName}</h2>
                </div>
                <div className={styles.postAction}>
                  <button
                    className={styles.updateButton}
                    onClick={() => handleSeeDetailsClick(post.id)}
                  >
                    see Details
                  </button>
                </div>
                <div className={styles.statusUpdate}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleStatusUpdate(post.id, selectedStatus[post.id]);
                    }}
                  >
                    {/* <label>
                      <input
                        type="radio"
                        name={`status-${post.id}`}
                        value="ACCEPTED"
                        checked={selectedStatus[post.id] === "ACCEPTED"}
                        onChange={() => handleStatusChange(post.id, "ACCEPTED")}
                      />
                      Accepted
                    </label> */}

                    <label>
                      <input
                        type="radio"
                        name={`status-${post.id}`}
                        value="IN_PROGRESS"
                        checked={selectedStatus[post.id] === "IN_PROGRESS"}
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
                  {post.postStatus !== "COMPLETED" && (
                    <button
                      type="button"
                      onClick={() => handleCancelRequest(post.id)}
                    >
                      Cancel Request
                    </button>
                  )}
                  {/* {post.postStatus === "COMPLETED" && (
                    <button type="button" className={styles.updateButton}>
                      Payment is done
                    </button>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CrafterWork;
