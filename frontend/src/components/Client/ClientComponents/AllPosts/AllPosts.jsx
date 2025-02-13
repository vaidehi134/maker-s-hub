import React, { useEffect, useState } from "react";
import { ClientService } from "../../Services/ClientService";
import { notification } from "antd";
import "./AllPosts.css";
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
    <div className="posts-container">
      <h1>DashBoard</h1>

      {posts.length === 0 ? (
        <h1 className="no-posts-message">No Posts Available</h1>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-item">
              <div className="post-content">
                <div className="post-images">
                  {post.imageUrls &&
                    post.imageUrls.map((img, index) => (
                      <img
                        key={index}
                        className="post-image"
                        src={getImageSrc(img)}
                        alt={`Post ${post.id} Image ${index + 1}`}
                        onError={(e) => {
                          e.target.src = "/path/to/placeholder-image.jpg"; // Placeholder on error
                        }}
                      />
                    ))}
                </div>
                <div className="post-details">
                  <h2 className="post-title">{post.itemName}</h2>
                  {/* <p className="post-description">
                    <strong>Description: </strong>
                    {post.description}
                  </p> */}
                </div>
                <div className="post-actions">
                  <button
                    className="update-btn"
                    onClick={() => handlePostClick(post.id)}
                  >
                    Update
                  </button>
                  <button
                    className="del-btn"
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
