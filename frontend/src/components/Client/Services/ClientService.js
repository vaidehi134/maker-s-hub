import axios from "axios";
import StorageService from "../../../util/StorageService";

// Base URL for your API
const BASIC_URL = "http://localhost:8080/";

// Create Authorization header
const createAuthorizationHeader = () => {
  const token = StorageService.getToken();
  console.log("Retrieved Token:", token);
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const ClientService = {
  // Post an post
  postPost(PostDTO) {
    console.log("postDto : \n" + PostDTO);

    console.log("fetching endpoint");
    const clientId = StorageService.getUserId();
    try {
      return axios.post(`${BASIC_URL}api/client/post/${clientId}`, PostDTO, {
        headers: createAuthorizationHeader(),
      });
    } catch (error) {
      console.error(error);
    }
  },

  // Get all Posts for a user
  getAllPostsByUserId() {
    const userId = StorageService.getUserId();
    try {
      return axios.get(`${BASIC_URL}api/client/posts/${userId}`, {
        headers: createAuthorizationHeader(),
      });
    } catch (error) {
      console.error(error);
    }
  },

  getPostById(postId) {
    console.log("clientService getPostById postId: ", postId);

    // Ensure postId is valid
    const longPostId = Number(postId);
    if (isNaN(longPostId)) {
      console.error("Invalid postId:", postId);
      throw new Error("postId must be a valid number");
    }

    // Send a POST request instead of GET
    return axios.post(
      `${BASIC_URL}api/client/postById`,
      { postId: longPostId }, // Pass postId in the request body
      {
        headers: createAuthorizationHeader(),
      }
    );
  },

  // Update an Post
  updatePost(postId, postDTO) {
    console.log("------------postDto" + postDTO); //for debugging

    // Ensure postId is converted to a valid number (if needed)
    const longPostId = Number(postId);

    // Check if the conversion is successful
    if (isNaN(longPostId)) {
      console.error("Invalid postId:", postId);
      throw new Error("postId must be a valid number");
    }

    // Make the API call with the valid postId
    return axios.put(`${BASIC_URL}api/client/post/${longPostId}`, postDTO, {
      headers: createAuthorizationHeader(),
    });
  },

  // Delete an post
  deletePostById(postId) {
    return axios.delete(`${BASIC_URL}api/client/post/${postId}`, {
      headers: createAuthorizationHeader(),
    });
  },

  
};
