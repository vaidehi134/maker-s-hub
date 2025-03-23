"use client";

import { useEffect, useState } from "react";
import { ClientService } from "../../Services/ClientService";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./AllPosts.module.css";
import CrafterContactDialog from "../CrafterContentDialog/CrafterContactDialog";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Dialog state
  const [assignedCrafterId, setAssignedCrafterId] = useState(null); // Selected crafter details

  const navigate = useNavigate();

  useEffect(() => {
    console.log("AllPost got called");
    fetchPosts();
  }, []);

  const handleFindCrafters = async (postId) => {
    console.log("handleFindCrafter() called");
    navigate(`/client/find-crafters/${postId}`);
  };

  const fetchPosts = async () => {
    try {
      const response = await ClientService.getAllPostsByUserId();
      setPosts(response.data);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an error fetching the posts",
      });
    }
  };

  const handleShowCompletedWork = async (crafterId, postId) => {
    navigate(`/client/completed-work/${postId}/${crafterId}`);
  };

  const handlePostClick = (postId) => {
    navigate(`/client/update-post/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    try {
      await ClientService.deletePostById(postId);
      notification.success({
        message: "Success",
        description: "Post deleted successfully",
      });
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to delete the post",
      });
      console.error("Error deleting post: ", error);
    }
  };

  // const handlePayNow = (postId, assignedCrafterId) => {
  //   console.log(
  //     "handlePayNow got called : postId , assignedId : ",
  //     postId,
  //     assignedCrafterId
  //   );
  //   navigate("/client/payment", {
  //     state: {
  //       postId: postId,
  //       assignedCrafterId: assignedCrafterId,
  //     },
  //   });
  // };

  const handlePaymentCheckBox = async (event, postId) => {
    try {
      const status = event.target.checked ? "PAID" : "AWAITING_PAYMENT";
      console.log(`Updating post status: ${status} for postId: ${postId}`);

      await ClientService.updatePostStatus(status, postId);

      // notification.success({
      //   message: "Success",
      //   description: `Post status updated to ${status}`,
      // });

      fetchPosts(); // Refresh posts list
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to update post status",
      });
      console.error("Error updating post status: ", error);
    }
  };

  const handleCancelRequest = async (postId, assignedCrafterId) => {
    try {
      await ClientService.cancelCrafterRequest(postId, assignedCrafterId);
      notification.success({
        message: "Success",
        description: "Crafter request canceled successfully",
      });
      fetchPosts();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to cancel the crafter request",
      });
      console.error("Error canceling crafter request: ", error);
    }
  };

  const handleShowContactDetails = (assignedCrafterId) => {
    setAssignedCrafterId(assignedCrafterId);
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setAssignedCrafterId(null);
  };

  const getImageSrc = (imgUrl) => imgUrl;

  return (
    <div className={styles.postsContainer}>
      {/* <h1 className={styles.dashboardHeading}>DashBoard</h1> */}

      {posts.length === 0 ? (
        <h1 className={styles.noPostsMessage}>No Posts Available</h1>
      ) : (
        <div className={styles.postsList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              <div className={styles.postContent}>
                {/* Show only the first image */}
                {post.imageDetails && post.imageDetails.length > 0 && (
                  <div className={styles.postImageContainer}>
                    <img
                      className={styles.postImage}
                      src={
                        getImageSrc(post.imageDetails[0].imgUrl) ||
                        "/placeholder.svg"
                      }
                      alt={`${post.itemName}`}
                      onError={(e) => {
                        e.target.src = "/path/to/placeholder-image.jpg";
                      }}
                    />
                  </div>
                )}
                <div className={styles.postDetails}>
                  <h2 className={styles.postTitle}>{post.itemName}</h2>
                  {post.postStatus === "PENDING" && (
                    <p className={styles.postStatus}>
                      No crafter has accepted your request yet
                    </p>
                  )}
                  {post.postStatus === "IN_PROGRESS" && (
                    <p className={styles.postStatus}>
                      <strong>Status: </strong>
                      Your order is being processed
                    </p>
                  )}
                  {post.postStatus === "COMPLETED" && (
                    <p className={styles.postStatus}>Your order is completed</p>
                  )}
                </div>
                <div className={styles.postActions}>
                  {/* Conditional rendering based on post status */}
                  {post.postStatus === "PENDING" ? (
                    <>
                      <button
                        className={styles.updateBtn}
                        onClick={() => handlePostClick(post.id)}
                      >
                        Update
                      </button>
                      <button
                        className={styles.delBtn}
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : post.postStatus === "ACCEPTED" ? (
                    post.assignedCrafterId !== null ? (
                      <button
                        className={styles.findCraftersBtn}
                        onClick={() => handleFindCrafters(post.id)}
                        type="button"
                      >
                        Find Crafters
                      </button>
                    ) : (
                      <>
                        <button
                          className={styles.findCraftersBtn}
                          onClick={() => handleFindCrafters(post.id)}
                          type="button"
                        >
                          Find Crafters
                        </button>
                        <button
                          className={styles.updateBtn}
                          onClick={() => handlePostClick(post.id)}
                        >
                          Update
                        </button>
                        <button
                          className={styles.delBtn}
                          onClick={() => handleDeletePost(post.id)}
                        >
                          Delete
                        </button>
                      </>
                    )
                  ) : post.postStatus === "ASSIGNED" ||
                    post.postStatus === "IN_PROGRESS" ||
                    post.postStatus === "COMPLETED" ? (
                    <button
                      className={styles.paymentBtn}
                      onClick={() =>
                        handleShowContactDetails(post.assignedCrafterId)
                      }
                    >
                      Crafter Contact Details
                    </button>
                  ) : null}

                  {post.postStatus === "AWAITING_PAYMENT" && (
                    <>
                      <p>
                        Order completed! Please contact the crafter for payment.
                      </p>
                      <button
                        className={styles.paymentBtn}
                        onClick={() =>
                          handleShowContactDetails(post.assignedCrafterId)
                        }
                      >
                        Crafter Contact Details
                      </button>
                      <button
                        type="button"
                        className={styles.viewCompletedWork}
                        onClick={() => {
                          handleShowCompletedWork(
                            post.assignedCrafterId,
                            post.id
                          );
                        }}
                      >
                        View Completed Work
                      </button>
                      {/* <button
                        onClick={() => {
                          handlePayNow(post.id, post.assignedCrafterId);
                        }}
                      >
                        Pay now
                      </button> */}

                      {/* ✅ Checkbox added here */}
                      <input
                        type="checkbox"
                        id={`paymentCheckbox-${post.id}`}
                        name={`paymentCheckbox-${post.id}`}
                        checked={post.postStatus === "PAID"}
                        onChange={(e) => handlePaymentCheckBox(e, post.id)}
                      />
                      <label
                        className={styles.checkboxLabel}
                        htmlFor={`paymentCheckbox-${post.id}`}
                      >
                        Check here if payment is done
                      </label>
                    </>
                  )}

                  {post.postStatus === "PAID" && (
                    <>
                      <p>
                        Payment received! Waiting for crafter's acknowledgment
                      </p>
                      <button
                        className={styles.paymentBtn}
                        onClick={() =>
                          handleShowContactDetails(post.assignedCrafterId)
                        }
                      >
                        Crafter Contact Details
                      </button>
                      <button
                        type="button"
                        className={styles.viewCompletedWork}
                        onClick={() => {
                          handleShowCompletedWork(
                            post.assignedCrafterId,
                            post.id
                          );
                        }}
                      >
                        View Completed Work
                      </button>
                      <input
                        type="checkbox"
                        id={`paymentCheckbox-${post.id}`}
                        name={`paymentCheckbox-${post.id}`}
                        checked={post.postStatus === "PAID"}
                        onChange={(e) => handlePaymentCheckBox(e, post.id)}
                      />
                      <label
                        className={styles.checkboxLabel}
                        htmlFor={`paymentCheckbox-${post.id}`}
                      >
                        Check here if payment is done
                      </label>
                    </>
                  )}

                  {post.postStatus === "ASSIGNED" && (
                    <button
                      className={styles.cancelBtn}
                      onClick={() =>
                        handleCancelRequest(post.id, post.assignedCrafterId)
                      }
                    >
                      Cancel Request
                    </button>
                  )}

                  {post.postStatus === "PAYMENT_ACKNOWLEDGED" && (
                    <>
                      <p> your payment has been acknowledged. Thank you!</p>
                      <button
                        className={styles.paymentBtn}
                        onClick={() =>
                          handleShowContactDetails(post.assignedCrafterId)
                        }
                      >
                        Crafter Contact Details
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Render the dialog */}
      <CrafterContactDialog
        isOpen={isOpen}
        onClose={handleCloseDialog}
        crafterId={assignedCrafterId}
      />
    </div>
  );
};

export default AllPosts;
