import React, { useEffect, useState } from "react";
import { ClientService } from "../../Services/ClientService"; // Update the path as needed
import styles from "./CrafterContactDialog.module.css";

const CrafterContactDialog = ({ isOpen, onClose, crafterId }) => {
  const [crafterDetails, setCrafterDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !crafterId) return;

    const fetchCrafterDetails = async () => {
      setLoading(true);
      try {
        const response = await ClientService.getCrafterByCrafterId(crafterId);
        setCrafterDetails(response.data);
      } catch (error) {
        console.error("Error fetching crafter details: ", error);
      }
      setLoading(false);
    };

    fetchCrafterDetails();
  }, [isOpen, crafterId]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h3>Crafter Contact Details</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>
              <strong>Name:</strong>{" "}
              {`${crafterDetails?.name || ""} ${
                crafterDetails?.lastname || ""
              }`}
            </p>
            <p>
              <strong>Email:</strong> {crafterDetails?.email}
            </p>
            <p>
              <strong>Phone:</strong> {crafterDetails?.phone}
            </p>
            <p>
              <strong>Address:</strong> {crafterDetails?.address}
            </p>
            <p>
              <strong>City:</strong> {crafterDetails?.location}
            </p>
          </>
        )}
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CrafterContactDialog;
