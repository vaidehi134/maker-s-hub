import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClientService } from "../../Services/ClientService";
import { notification, Rate } from "antd"; // Import Rate from Ant Design
import styles from "./CrafterPortfolio.module.css";

const CrafterPortfolio = () => {
  const { crafterId, postId } = useParams();
  const [crafter, setCrafter] = useState(null);
  const [crafterWork, setCrafterWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCrafter();
    fetchCrafterWork();
  }, [crafterId]);

  // Fetch crafter details
  const fetchCrafter = async () => {
    try {
      const response = await ClientService.getCrafterByCrafterId(crafterId);
      setCrafter(response.data);
    } catch (error) {
      console.error("Error fetching crafter:", error);
      notification.error({
        message: "Error",
        description: "Failed to load crafter details",
      });
    }
  };

  const handleBackButton = async () => {
    console.log("clicked handleBackButton function...");
    navigate(`/client/find-crafters/${postId}`);
  };

  // Fetch crafter work (portfolio)
  const fetchCrafterWork = async () => {
    try {
      const response = await ClientService.getCrafterWork(crafterId);
      console.log("Crafter Work DTO:", response.data); // Log the full response
      setCrafterWork(response.data);
    } catch (error) {
      console.error("Error fetching crafter work:", error);
      notification.error({
        message: "Error",
        description: "Failed to load crafter's work",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className={styles.loading}>Loading crafter details...</p>;
  }

  if (!crafter) {
    return <p className={styles.error}>Crafter details not found</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Crafter's Portfolio</h1>
      <div className={styles.details}>
        <p>
          <strong>Name:</strong> {crafter.name} {crafter.lastname}
        </p>
        <p>
          <strong>Email:</strong> {crafter.email}
        </p>
        <p>
          <strong>Phone:</strong> {crafter.phone}
        </p>
        <p>
          <strong>Skills:</strong> {crafter.skills}
        </p>
        <p>
          <strong>Address:</strong> {crafter.address}
        </p>
      </div>

      {crafterWork && crafterWork.length > 0 ? (
        <div className={styles.workSection}>
          <h2 className={styles.subHeading}>Recent Work</h2>

          {crafterWork.map((work, index) => (
            <div key={index} className={styles.workItem}>
              {work.imageDetails && work.imageDetails.length > 0 && (
                <div className={styles.imageContainer}>
                  <img
                    src={work.imageDetails[0].imgUrl}
                    alt="Crafter Work"
                    className={styles.workImage}
                  />
                </div>
              )}

              {/* Display Star Rating */}
              <div className={styles.ratingContainer}>
                <strong>Rating:</strong>
                <Rate
                  allowHalf
                  value={work.rating || 0}
                  disabled
                  className={styles.starRating}
                />
                <span className={styles.ratingText}>
                  {work.rating ? " " : "No rating available"}
                </span>
              </div>

              <p>
                <strong>Client's Feedback : </strong>
                {work.clientFeedback || "no feedback provided"}
              </p>

              <p>
                <strong>About This Work:</strong>{" "}
                {work.comment || "No comments provided"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noWorkMessage}>
          No completed projects available for this crafter at the moment.
        </p>
      )}

      <button
        type="button"
        className={styles.backButton}
        onClick={handleBackButton}
      >
        Back
      </button>
    </div>
  );
};

export default CrafterPortfolio;
