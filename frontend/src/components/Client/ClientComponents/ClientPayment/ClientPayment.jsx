// import React, { useState } from "react";
// import StorageService from "../../../../util/StorageService";
// import { useLocation } from "react-router-dom";
// import styles from "./ClientPayment.module.css";

// const paymentMethods = [
//   "UPI",
//   "CREDIT_CARD",
//   "DEBIT_CARD",
//   "PAYPAL",
//   "BANK_TRANSFER",
//   "CASH",
//   "WALLET",
// ];

// const ClientPayment = () => {
//   const location = useLocation();
//   const { postId, assignedCrafterId } = location.state || {}; // Get postId and crafterId from state
//   const clientId = StorageService.getUserId();
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [paymentNote, setPaymentNote] = useState("");

//   const handlePaymentMethodChange = (method) => {
//     setSelectedMethod(method);
//     setPaymentNote(""); // Reset payment note when method changes
//   };

//   const handlePaymentSubmit = async () => {
//     const paymentData = {
//       postId,
//       crafterId : assignedCrafterId,
//       clientId,
//       amount: 100.0, // Example amount, you can modify this
//       postStatus: "PAID",
//       paymentMethod: selectedMethod,
//       paymentNote,
//     };

//     console.log("Submitting Payment:", paymentData);

//     try {
//       const response = await fetch("http://localhost:8080/api/payments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(paymentData),
//       });

//       if (response.ok) {
//         alert("Payment submitted successfully!");
//       } else {
//         alert("Payment submission failed.");
//       }
//     } catch (error) {
//       console.error("Error submitting payment:", error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Select Payment Method</h2>
//       {paymentMethods.map((method) => (
//         <label key={method} className={styles.label}>
//           <input
//             type="radio"
//             name="paymentMethod"
//             value={method}
//             checked={selectedMethod === method}
//             onChange={() => handlePaymentMethodChange(method)}
//           />
//           {method.replace("_", " ")}
//         </label>
//       ))}

//       {selectedMethod && (
//         <div className={styles.paymentMethods}>
//           <label>
//             {selectedMethod === "UPI" && "Enter UPI Transaction ID:"}
//             {selectedMethod === "CREDIT_CARD" && "Enter Last 4 Digits of Card:"}
//             {selectedMethod === "DEBIT_CARD" && "Enter Last 4 Digits of Card:"}
//             {selectedMethod === "PAYPAL" && "Enter PayPal Transaction ID:"}
//             {selectedMethod === "BANK_TRANSFER" && "Enter Reference Number:"}
//             {selectedMethod === "CASH" &&
//               "Enter Cash Payment Reference (Optional):"}
//             {selectedMethod === "WALLET" && "Enter Wallet Transaction ID:"}
//           </label>
//           <input
//             type="text"
//             value={paymentNote}
//             onChange={(e) => setPaymentNote(e.target.value)}
//             placeholder="Enter payment proof"
//             className={styles.paymentInput}
//           />
//         </div>
//       )}

//       <button onClick={handlePaymentSubmit} className={styles.submitButton}>
//         Submit Payment
//       </button>
//     </div>
//   );
// };

// export default ClientPayment;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StorageService from "../../../../util/StorageService";

import styles from "./ClientPayment.module.css";
import { ClientService } from "../../Services/ClientService";
import { notification } from "antd";

const paymentMethods = [
  "UPI",
  "CREDIT_CARD",
  "DEBIT_CARD",
  "PAYPAL",
  "BANK_TRANSFER",
  "CASH",
  "WALLET",
];

const ClientPayment = () => {
  const location = useLocation();
  const { postId, assignedCrafterId } = location.state || {};
  const clientId = StorageService.getUserId();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0.0);
  const navigate = useNavigate();

  useEffect(() => {
    if (assignedCrafterId && postId) {
      fetchEstimatedPrice();
    }
  }, [assignedCrafterId, postId]);

  const fetchEstimatedPrice = async () => {
    try {
      const response = await ClientService.getCrafterProposalById(
        assignedCrafterId,
        postId
      );
      const proposalData = response.data;
      setEstimatedPrice(proposalData.estimatedPrice || 0.0);
    } catch (error) {
      console.error("Error fetching estimated price:", error);
    }
  };

  const handleBackButton = () => {
    navigate("/all-posts");
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedMethod(method);
    setPaymentNote("");
  };

  const handlePaymentSubmit = async () => {
    const paymentDto = {
      postId,
      crafterId: assignedCrafterId,
      clientId,
      amount: estimatedPrice,
      postStatus: "PAID",
      paymentMethod: selectedMethod,
      paymentNote,
    };

    try {
      await ClientService.clientPayment(paymentDto);
      notification.success({
        message: "Success",
        description: "Your payment is successful",
      });
      navigate("/crafter-all-posts");
    } catch (error) {
      console.error("Error processing payment:", error);
      notification.error({
        message: "Error",
        description: "Failed to complete payment",
      });
    }
  };

  return (
    <div className={styles.paymentContainer}>
      <h2 className={styles.paymentTitle}>Select Payment Method</h2>
      <p className={styles.estimatedPrice}>
        Estimated Price: ₹{estimatedPrice.toFixed(2)}
      </p>

      {paymentMethods.map((method) => (
        <label key={method} className={styles.paymentOption}>
          <input
            type="radio"
            name="paymentMethod"
            value={method}
            checked={selectedMethod === method}
            onChange={() => handlePaymentMethodChange(method)}
            className={styles.paymentRadio}
          />
          {method.replace("_", " ")}
        </label>
      ))}

      {selectedMethod && (
        <div className={styles.paymentDetails}>
          <label className={styles.paymentLabel}>
            {selectedMethod === "UPI" && "Enter UPI Transaction ID:"}
            {selectedMethod === "CREDIT_CARD" && "Enter Last 4 Digits of Card:"}
            {selectedMethod === "DEBIT_CARD" && "Enter Last 4 Digits of Card:"}
            {selectedMethod === "PAYPAL" && "Enter PayPal Transaction ID:"}
            {selectedMethod === "BANK_TRANSFER" && "Enter Reference Number:"}
            {selectedMethod === "CASH" &&
              "Enter Cash Payment Reference (Optional):"}
            {selectedMethod === "WALLET" && "Enter Wallet Transaction ID:"}
          </label>
          <input
            type="text"
            value={paymentNote}
            onChange={(e) => setPaymentNote(e.target.value)}
            placeholder="Enter payment proof"
            className={styles.paymentInputField}
          />
        </div>
      )}

      <button onClick={handlePaymentSubmit} className={styles.paymentButton}>
        Submit Payment Proof
      </button>

      <button onClick={handleBackButton} className={styles.backButton}>
        Back
      </button>
    </div>
  );
};

export default ClientPayment;
