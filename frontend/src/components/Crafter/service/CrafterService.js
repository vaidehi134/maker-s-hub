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

export const CrafterService = {
  // Get all Posts for a crafter
  getAllPosts(requestDTO) {
    console.log("request dto : \n", requestDTO);

    console.log("fetching an endpoint");
    try {
      return axios.post(`${BASIC_URL}api/crafter/request`, requestDTO, {
        headers: createAuthorizationHeader(),
      });
    } catch (error) {
      console.error(error);
    }
  },

  getPostById(postId) {
    console.log("CrafterService : getPostByPostId()", postId);
    const longPostId = Number(postId);
    if (isNaN(longPostId)) {
      console.log("invalid postID", postId);
    }
    try {
      return axios.get(`${BASIC_URL}api/crafter/postByPostId/${postId}`, {
        headers: createAuthorizationHeader(),
      });
    } catch (error) {
      console.error(error);
    }
  },

  postCrafterProposal(crafterProposalDTO) {
    console.log("CrafterService : crafterProposalDTO : ", crafterProposalDTO);
    try {
      return axios.post(
        `${BASIC_URL}api/crafter/post-crafter-proposal`,
        crafterProposalDTO,
        {
          headers: createAuthorizationHeader(),
        }
      );
    } catch (error) {
      console.error(error);
    }
  },

  updateCrafterProposal(crafterProposalDTO) {
    console.log(
      "CrafterService : crafterProposalDTO (updatePost) : ",
      crafterProposalDTO
    );

    try {
      return axios.post(
        `${BASIC_URL}api/crafter/update-crafter-proposal`,
        crafterProposalDTO,
        {
          headers: createAuthorizationHeader(),
        }
      );
    } catch (error) {
      console.error(error);
    }
  },

  deleteCrafterProposal(crafterProposalId) {
    console.log(
      "CrafterService : crafterProposalId(deletePost) : ",
      crafterProposalId
    );
    try {
      return axios.delete(
        `${BASIC_URL}api/crafter/delete-crafter-proposal/${crafterProposalId}`,
        {
          headers: createAuthorizationHeader(),
        }
      );
    } catch (error) {
      console.error(error);
    }
  },
  getCrafterProposal(postId, crafterId) {
    console.log("CrafterService : getCrafterProposal");
    try {
      return axios.get(
        `${BASIC_URL}api/crafter/get-crafter-proposal/${postId}?crafterId=${crafterId}`,
        {
          headers: createAuthorizationHeader(),
        }
      );
    } catch (error) {
      console.error(error);
    }
  },
  getWorkByCrafterId(crafterId) {
    console.log("crafterService  : getWorkByCrafterId()", crafterId);
    try {
      return axios.get(
        `${BASIC_URL}api/crafter/getWorkByCrafterId/${crafterId}`,
        {
          headers: createAuthorizationHeader(),
        }
      );
    } catch (error) {
      console.error(error);
    }
  },

  updatePostStatus(status, postId) {
    console.log("crafterService : updatePostStatus() called....");
    const longPostId = Number(postId);
    if (isNaN(longPostId)) {
      console.log("invalid postID", postId);
    }
    try {
      return axios.post(
        `${BASIC_URL}api/crafter/post-status/${status}?postId=${longPostId}`, // Include postId as a query parameter
        null, // No data in the request body
        {
          headers: createAuthorizationHeader(),
        }
      );
    } catch (error) {
      console.error(error);
    }
  },

  cancelRequestForPost(postId, crafterId) {
    console.log("CrafterService() : cancelRequestForPost");
    return axios
      .post(
        `${BASIC_URL}api/crafter/cancel-request-for-post/${postId}?crafterId=${crafterId}`,
        null,
        {
          headers: createAuthorizationHeader(),
        }
      )
      .catch((error) => {
        console.error("Error in cancelRequestForPost:", error);
        throw error; // Re-throw the error to be caught in the component
      });
  },
};
