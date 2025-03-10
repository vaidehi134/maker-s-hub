import axios from "axios";
import StorageService from "../../../util/StorageService";

// Base URL for your API
const BASIC_URL = "http://localhost:8080/";

// Create Authorization header
const createAuthorizationHeader = () => {
  const token = StorageService.getToken();
  //console.log("Retrieved Token:", token);
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

  // Get crafters by post id
  getAllCrafterByPostId(postId) {
    console.log("ClientService : getAllCrafterByPostId() for postId", postId);
    const longPostId = Number(postId);

    // Check if postId is a valid number
    if (isNaN(longPostId)) {
      console.error("Invalid postId:", postId);
      return Promise.reject(new Error("Invalid postId"));
    }

    try {
      return axios.get(`${BASIC_URL}api/client/find-crafter/${longPostId}`, {
        headers: createAuthorizationHeader(),
      });
    } catch (error) {
      console.error("error : ", error);
      return Promise.reject(error);
    }
  },

  getPostById(postId) {
    console.log("clientService getPostById postId: ", postId);

    // Ensure postId is valid
    const longPostId = Number(postId);
    if (isNaN(longPostId)) {
      //is Not a Number
      console.error("Invalid postId:", postId);
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
      //put ??
      headers: createAuthorizationHeader(),
    });
  },

  // Delete an post
  deletePostById(postId) {
    return axios.delete(`${BASIC_URL}api/client/post/${postId}`, {
      headers: createAuthorizationHeader(),
    });
  },

  acceptCrafterRequest(crafterAssignmentDTO) {
    console.log("acceptedCrafterRequest() got called.....");
    try {
      return axios.post(
        `${BASIC_URL}api/client/accept-crafter`,
        crafterAssignmentDTO,
        {
          headers: createAuthorizationHeader(),
        }
      );
    } catch (error) {
      console.error(error);
    }
  },

  // getCrafterProposalById(crafterId) {
  //   console.log("clientService: getCrafterProposalById()");
  //   try {
  //     return axios.get(`${BASIC_URL}api/client/crafter-proposal/${crafterId}`, {
  //       headers: createAuthorizationHeader(),
  //     });
  //   } catch (error) {
  //     console.error("error : ", error);
  //     return Promise.reject(error);
  //   }
  // },

  getCrafterProposalById(crafterId, postId) {
  console.log("clientService: getCrafterProposalById()");
  try {
    return axios.get(`${BASIC_URL}api/client/crafter-proposal/${crafterId}/${postId}`, {
      headers: createAuthorizationHeader(),
    });
  } catch (error) {
    console.error("error : ", error);
    return Promise.reject(error);
  }
},

  cancelCrafterRequest(postId, assignedCrafterId) {
    console.log("ClientService : cancelCrafterRequest()");

    const longCrafterId = Number(assignedCrafterId);

    // Check if postId is a valid number
    if (isNaN(longCrafterId)) {
      console.error("Invalid longCrafterId:", postId);
      return Promise.reject(new Error("Invalid postId"));
    }
    try {
      return axios.post(
        `${BASIC_URL}api/client/cancel-crafter-request/${postId}`, // Add "cancel-"
        longCrafterId,
        {
          headers: {
            ...createAuthorizationHeader(),
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("error : ", error);
      return Promise.reject(error);
    }
  },
  getCrafterByCrafterId(crafterId) {
    console.log("clientService: getCrafterByCrafterId()");
    try {
      return axios.get(
        `${BASIC_URL}api/client/get-crafter-by-crafterId/${crafterId}`,
        {
          headers: createAuthorizationHeader(),
        }
      );
    } catch (error) {
      console.error("error : ", error);
      return Promise.reject(error);
    }
  },

  // Add this to your service file
  getLocationSuggestions(query) {
    console.log("Fetching location suggestions for:", query);
    try {
      return axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json`
      );
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      return Promise.reject(error);
    }
  },
};
