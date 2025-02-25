import React, { useEffect, useState } from "react";
import { ClientService } from "../../Services/ClientService";
import { notification } from "antd";
import styles from "./AllPosts.module.css";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const [posts, setPosts] = useState([]); // Initialized as an empty array

  useEffect(() => {
    console.log("AllPost got called");
    fetchPosts();
  }, []);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await ClientService.getAllPostsByUserId();
      setPosts(response.data);

      console.log("fetchPost got called...........");
      console.log(response.data);
      // Log image URLs for each post
      response.data.forEach((post) => {
        console.log("Post ID:", post.id);
        console.log("Image URLs:", post.imageUrls); // Changed to imageUrls
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an error fetching the posts",
      });
      console.error("Error fetching posts: ", error);
    }
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

  const getImageSrc = (imgUrl) => imgUrl; // Directly return the image URL

  return (
    <div className={styles.postsContainer}>
      <h1>DashBoard</h1>

      {posts.length === 0 ? (
        <h1 className={styles.noPostsMessage}>No Posts Available</h1>
      ) : (
        <div className={styles.postsList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              <div className={styles.postContent}>
                <div className={styles.postImages}>
                  {post.imageUrls &&
                    post.imageUrls.map((img, index) => (
                      <img
                        key={index}
                        className={styles.postImage}
                        src={getImageSrc(img)}
                        alt={`Post ${post.id} Image ${index + 1}`}
                        onError={(e) => {
                          e.target.src = "/path/to/placeholder-image.jpg"; // Placeholder on error
                        }}
                      />
                    ))}
                </div>
                <div className={styles.postDetails}>
                  <h2 className={styles.postTitle}>{post.itemName}</h2>
                  {/* <p className={styles.postDescription}>
                    <strong>Description: </strong>
                    {post.description}
                  </p> */}
                </div>
                <div className={styles.postActions}>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPosts;