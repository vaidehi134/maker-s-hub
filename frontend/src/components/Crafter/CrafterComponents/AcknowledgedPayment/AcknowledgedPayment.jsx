import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CrafterService } from "../../service/CrafterService";
import { notification } from "antd";
import styles from "./AcknowledgedPayment.module.css"; // Importing CSS module

const paymentLabels = {
  UPI: "Transaction ID",
  CREDIT_CARD: "Last 4 Digits of Card",
  DEBIT_CARD: "Last 4 Digits of Card",
  PAYPAL: "PayPal Transaction ID",
  BANK_TRANSFER: "Reference Number",
  CASH: "Cash Payment Reference (Optional)",
  WALLET: "Wallet Transaction ID",
};

const AcknowledgedPayment = () => {
  const { crafterId, postId } = useParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentConfirmation = async () => {
      try {
        const response = await CrafterService.getPaymentConfirmation(
          crafterId,
          postId
        );
        setPaymentDetails(response.data);
      } catch (err) {
        setError("Failed to fetch payment details");
        console.error("Error fetching payment confirmation:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentConfirmation();
  }, [crafterId, postId]);

  if (loading)
    return <p className={styles.loading}>Loading payment details...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!paymentDetails)
    return <p className={styles.noDetails}>No payment details found.</p>;

  const handleStatusUpdate = async (postId) => {
    try {
      const response = await CrafterService.updatePostStatus(
        "PAYMENT_ACKNOWLEDGED",
        postId
      );
      notification.success({
        message: "You have successfully acknowledged payment...",
        description: response.data.message || " ",
      });
      navigate("/crafter-work");
    } catch (error) {
      console.error("Error acknowledging payment : ", error);
      notification.error({
        message: "Error updating status",
        description: error.message || "Something went wrong",
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Payment Confirmation</h2>
      <div className={styles.details}>
        <p className={styles.detailItem}>
          <strong>Amount:</strong> {paymentDetails.amount}
        </p>
        <p className={styles.detailItem}>
          <strong>Payment Method:</strong> {paymentDetails.paymentMethod}
        </p>
        <p className={styles.detailItem}>
          <strong>
            {paymentLabels[paymentDetails.paymentMethod] || "Payment Note"}:
          </strong>{" "}
          {paymentDetails.paymentNote}
        </p>
      </div>

      <button
        className={styles.button}
        onClick={() => handleStatusUpdate(postId)}
      >
        Acknowledge Payment
      </button>
    </div>
  );
};

export default AcknowledgedPayment;
