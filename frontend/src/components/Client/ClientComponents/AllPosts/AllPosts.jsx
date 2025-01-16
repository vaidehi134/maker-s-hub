import React, { useEffect, useState } from "react";
import { ClientService } from "../../Services/ClientService";
import { notification } from "antd";
import "./AllPosts.css";
const AllPosts = () => {
  const [posts, setPosts] = useState([]); //initialized as an empty array

  //Fetch posts when component mount (when component is reloded ? )
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await ClientService.getAllPostsByUserId();
      setPosts(response.data); //set the fetched posts data
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an error fetching the posts",
      });
      console.error("Error fetching posts: ", error);
    }
  };

  return (
    <div className="posts-container">
      <div className="posts-list">
        {posts.length === 0 ? (
          <p>No Posts available</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-item">
              <div className="post-content">
                <div className="post-image">
                  <img
                    className="profile"
                    src={`data:image/${post.imageType};base64, ${post.returnedImg}`}
                    alt={post.itemName}
                  />
                </div>
                <div className="post-details">
                  <h2>{post.itemName}</h2>
                  <p>
                    <strong>Description: </strong>
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllPosts;
