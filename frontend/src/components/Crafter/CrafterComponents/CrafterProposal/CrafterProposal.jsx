import React, { useEffect, useState } from "react";
import StorageService from "../../../../util/StorageService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostDetails from "../PostDetails/PostDetails";
import { notification } from "antd";
import { CrafterService } from "../../service/CrafterService";
import styles from "./CrafterProposal.module.css";

const CrafterProposal = () => {
  const { postId } = useParams();
  const location = useLocation();
  const { postStatus } = location.state || {};
  const { isPostAcceptingCrafter } = location.state || {};
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [comment, setComment] = useState("");
  const [crafterProposal, setCrafterProposal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("CrafterProposal component");
    console.log("Location state: ", location.state);
    console.log("isPostAcceptingCrafter : ", isPostAcceptingCrafter);
  }, []);

  // Fetch existing proposal when component mounts if status is ACCEPTED
  useEffect(() => {
    if (postStatus === "ACCEPTED") {
      console.log("getCrafterProposal() called.....");
      CrafterService.getCrafterProposal(postId, StorageService.getUserId())
        .then((response) => {
          if (response.status === 200) {
            const proposal = response.data;
            setCrafterProposal(proposal);
            // Ensure we always set valid values
            setEstimatedPrice(proposal.estimatedPrice || "");
            setComment(proposal.comment || "");
          }
        })
        .catch((error) => {
          console.error("Error fetching crafter proposal:", error);
        });
    }
  }, [postId, postStatus]);

  const handleBackButton = () => {
    navigate("/crafter-all-posts");
  };

  const handleSendRequest = async (event) => {
    event.preventDefault();
    const crafterProposalDTO = {
      postId: postId,
      crafterId: StorageService.getUserId(),
      estimatedPrice: parseFloat(estimatedPrice),
      comment: comment,
    };

    try {
      const response = await CrafterService.postCrafterProposal(
        crafterProposalDTO
      );
      if (response.status === 200) {
        notification.success({
          message: "Proposal posted successfully",
        });
      } else {
        notification.error({
          message: "Failed to post proposal",
          description: response.data,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error posting proposal",
        description: error.message,
      });
    }
    navigate("/crafter-all-posts");
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const crafterProposalDTO = {
      id: crafterProposal?.id,
      postId: postId,
      crafterId: StorageService.getUserId(),
      estimatedPrice: parseFloat(estimatedPrice),
      comment: comment,
    };

    try {
      const response = await CrafterService.updateCrafterProposal(
        crafterProposalDTO
      );
      if (response.status === 200) {
        notification.success({
          message: "Proposal updated successfully",
        });
      } else {
        notification.error({
          message: "Failed to update proposal",
          description: response.data,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error updating proposal",
        description: error.message,
      });
    }
    navigate("/crafter-all-posts");
  };

  const handleDelete = async () => {
    try {
      const response = await CrafterService.deleteCrafterProposal(
        crafterProposal?.id
      );
      if (response.status === 200) {
        notification.success({
          message: "Proposal deleted successfully",
        });
      } else {
        notification.error({
          message: "Failed to delete proposal",
          description: response.data,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error deleting proposal",
        description: error.message,
      });
    }
    navigate("/crafter-all-posts");
  };

  return (
    <div>
      <PostDetails postId={postId} />
      <form
        onSubmit={postStatus === "PENDING" ? handleSendRequest : handleUpdate}
        className={styles.proposalForm}
      >
        <div>
          <label htmlFor="estimatedPrice">Estimated Price in Rs:</label>
          <input
            type="number"
            id="estimatedPrice"
            placeholder="00.00"
            value={estimatedPrice || ""} // Ensure value is never undefined
            onChange={(e) => setEstimatedPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="comment">Proposal Comments:</label>
          <textarea
            id="comment"
            value={comment || ""} // Ensure value is never undefined
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>

        {postStatus === "ACCEPTED" && isPostAcceptingCrafter ? ( //if crafter has already requested / accepted post
          <div>
            <button type="submit" onClick={handleUpdate}>
              Update Request
            </button>
            <button type="button" onClick={handleDelete}>
              Delete Request
            </button>
          </div>
        ) : (
          <div>
            <button type="submit" onClick={handleSendRequest}>
              Send Request
            </button>
          </div>
        )}
        <button type="button" onClick={handleBackButton}>
          Back
        </button>
      </form>
    </div>
  );
};

export default CrafterProposal;
