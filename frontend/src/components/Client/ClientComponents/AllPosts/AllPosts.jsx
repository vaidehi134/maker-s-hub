// import React, { useEffect, useState } from "react";
// import { ClientService } from "../../Services/ClientService";
// import { notification } from "antd";
// import "./AllPosts.css";
// import { useNavigate } from "react-router-dom";

// const AllPosts = () => {
//   const [posts, setPosts] = useState([]); // Initialized as an empty array

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const navigate = useNavigate();

//   // const fetchPosts = async () => {
//   //   try {
//   //     const response = await ClientService.getAllPostsByUserId();
//   //     setPosts(response.data);
//   //     console.log("response :", response.data);
//   //     console.log("images", posts.returnedImages);
//   //   } catch (error) {
//   //     notification.error({
//   //       message: "Error",
//   //       description: "There was an error fetching the posts",
//   //     });
//   //     console.error("Error fetching posts: ", error);
//   //   }
//   // };

//   const fetchPosts = async () => {
//     try {
//       const response = await ClientService.getAllPostsByUserId();
//       setPosts(response.data);

//       // Log images for each post
//       response.data.forEach((post) => {
//         console.log("Post ID:", post.id);
//         console.log("Returned Images:", post.returnedImages);
//       });
//     } catch (error) {
//       notification.error({
//         message: "Error",
//         description: "There was an error fetching the posts",
//       });
//       console.error("Error fetching posts: ", error);
//     }
//   };

//   const handlePostClick = (postId) => {
//     navigate(`/client/update-post/${postId}`);
//   };

//   const handleDeletePost = async (postId) => {
//     try {
//       await ClientService.deletePostById(postId);
//       notification.success({
//         message: "Success",
//         description: "Post deleted successfully",
//       });
//       setPosts(posts.filter((post) => post.id !== postId));
//     } catch (error) {
//       notification.error({
//         message: "Error",
//         description: "Failed to delete the post",
//       });
//       console.error("Error deleting post: ", error);
//     }
//   };

//   // const getImageSrc = (img) => {
//   //   if (img.startsWith("/9j/")) {
//   //     return `data:image/jpeg;base64,${img}`;
//   //   } else if (img.startsWith("iVBOR")) {
//   //     return `data:image/png;base64,${img}`;
//   //   } else {
//   //     return null;
//   //   }
//   // };

//   const getImageSrc = (img) => {
//     return `data:image/jpeg;base64,${img}`;
//   }; //reason -> https://chatgpt.com/c/6794cd52-f0b0-800f-9f5b-b8342d13deb8

//   return (
//     <div className="posts-container">
//       <h1>DashBoard</h1>

//       {posts.length === 0 ? (
//         <h1 className="no-posts-message">No Posts Available</h1>
//       ) : (
//         <div className="posts-list">
//           {posts.map((post) => (
//             <div key={post.id} className="post-item">
//               <div className="post-content">
//                 <div className="post-images">
//                   {post.returnedImages &&
//                     post.returnedImages.map((img, index) => {
//                       const src = getImageSrc(img);
//                       if (!src) return null;
//                       return (
//                         <img
//                           key={index}
//                           className="post-image"
//                           src={src}
//                           alt={`Post ${post.id} Image ${index + 1}`}
//                         />
//                       );
//                     })}
//                 </div>
//                 <div className="post-details">
//                   <h2 className="post-title">{post.itemName}</h2>
//                   <p className="post-description">
//                     <strong>Description: </strong>
//                     {post.description}
//                   </p>
//                 </div>
//                 <div className="post-actions">
//                   <button
//                     className="update-btn"
//                     onClick={() => handlePostClick(post.id)}
//                   >
//                     Update
//                   </button>
//                   <button
//                     className="del-btn"
//                     onClick={() => handleDeletePost(post.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllPosts;


import React, { useEffect, useState } from "react";
import { ClientService } from "../../Services/ClientService";
import { notification } from "antd";
import styles from "./AllPosts.module.css";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const [posts, setPosts] = useState([]); // Initialized as an empty array

  useEffect(() => {
    fetchPosts();
  }, []);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await ClientService.getAllPostsByUserId();
      setPosts(response.data);

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
                  <p className={styles.postDescription}>
                    <strong>Description: </strong>
                    {post.description}
                  </p>
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
