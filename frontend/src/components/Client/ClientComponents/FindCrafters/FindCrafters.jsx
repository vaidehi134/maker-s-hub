import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClientService } from "../../Services/ClientService";
import { notification } from "antd";
import styles from "./FindCrafters.module.css";
import { CrafterService } from "../../../Crafter/service/CrafterService";

const FindCrafters = () => {
  const { postId } = useParams();
  const [crafters, setCrafters] = useState([]);
  const [isPostAccepted, setIsPostAccepted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCraftersWithProposals();
  }, [postId]);

  const fetchCraftersWithProposals = async () => {
    try {
      const initialCrafters = await ClientService.getAllCrafterByPostId(postId);

      const craftersWithProposals = await Promise.all(
        initialCrafters.data.map(async (crafter) => {
          try {
            // Call the updated method with both crafterId and postId
            const proposalResponse = await ClientService.getCrafterProposalById(
              crafter.id,
              postId
            );
            return {
              ...crafter,
              proposal: proposalResponse.data,
            };
          } catch (error) {
            console.warn(
              `Error fetching proposal for crafter ${crafter.id}:`,
              error
            );
            return { ...crafter, proposal: null };
          }
        })
      );

      setCrafters(craftersWithProposals);
    } catch (error) {
      console.error("Error fetching crafters:", error);
      notification.error({
        message: "Error",
        description: "Failed to load crafters",
      });
    }
  };

  const handleViewCrafterPortfolio = (crafterId)=>{
   
   navigate(`/client/crafter-portfolio/${crafterId}/${postId}`);
  };

  const handleAcceptRequest = async (crafterId) => {
    const crafterAssignmentDTO = {
      postId: postId,
      crafterId: crafterId,
    };

    try {
      const response = await ClientService.acceptCrafterRequest(
        crafterAssignmentDTO
      );
      if (response.status === 200) {
        notification.success({
          message: "You've Successfully Assigned This Project!",
        });
        setIsPostAccepted(true);
      } else {
        notification.error({
          message: "Failed to accept proposal",
          description: response.data,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error accepting proposal",
        description: error.message,
      });
    } finally {
      navigate("/all-posts");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Select the Perfect Crafter for Your Project</h1>
      {!isPostAccepted ? (
        crafters.length === 0 ? (
          <p className={styles.noCraftersMessage}>
            No Crafters Have Applied Yet
          </p>
        ) : (
          <div>
            <ul className={styles.craftersList}>
              {crafters.map((crafter) => (
                <li key={crafter.email} className={styles.crafterItem}>
                  <div className={styles.crafterDetails}>
                    <strong> Crafter Name :</strong>{" "}
                    {`${crafter.name} ${crafter.lastname}`}
                    <br />
                    {crafter.proposal ? (
                      <>
                        <hr />
                        <strong>Proposed Budget:</strong> Rs.
                        {crafter.proposal.estimatedPrice}.00
                        <br />
                        <strong>Crafter's Note:</strong>{" "}
                        {crafter.proposal.comment}
                      </>
                    ) : (
                      <p>Proposal details unavailable</p>
                    )}
                  </div>
                  <button
                    className={styles.acceptRequestBtn}
                    onClick={() => handleAcceptRequest(crafter.id)}
                  >
                    Hire this crafter
                  </button>
                  <button className={styles.acceptRequestBtn}
                   onClick={()=> handleViewCrafterPortfolio(crafter.id)}>
                    View Crafter's Portfolio
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : (
        <p className={styles.noCraftersMessage}>Post has been accepted</p>
      )}
    </div>
  );
};

export default FindCrafters;
