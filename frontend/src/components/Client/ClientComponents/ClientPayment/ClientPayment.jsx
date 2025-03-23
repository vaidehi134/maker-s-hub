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
import { useLocation } from "react-router-dom";
import StorageService from "../../../../util/StorageService";

import styles from "./ClientPayment.module.css";
import { ClientService } from "../../Services/ClientService";



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
  const { postId, assignedCrafterId } = location.state || {}; // Get postId and crafterId from state
  const clientId = StorageService.getUserId();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0.0); // Store estimated price

  useEffect(() => {
    console.log("client payment got called");
    if (assignedCrafterId && postId) {
        console.log("assignedCrafterId" , assignedCrafterId , "postId",postId);
      fetchEstimatedPrice();
    }
  }, [assignedCrafterId, postId]);

  const fetchEstimatedPrice = async () => {
    try {
      console.log("fetch estimated price got called");
      const response = await ClientService.getCrafterProposalById(
        assignedCrafterId,
        postId
      );
      const proposalData = response.data;
      setEstimatedPrice(proposalData.estimatedPrice || 0.0);
      console.log("estimated price : ", estimatedPrice);
    } catch (error) {
      console.error("Error fetching estimated price:", error);
    }
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedMethod(method);
    setPaymentNote(""); // Reset payment note when method changes
  };

  const handlePaymentSubmit = async () => {
    const paymentData = {
      postId,
      crafterId: assignedCrafterId,
      clientId,
      amount: estimatedPrice, // Set amount as estimatedPrice
      postStatus: "PAID",
      paymentMethod: selectedMethod,
      paymentNote,
    };

    console.log("Submitting Payment:", paymentData);

    try {
      const response = await fetch("http://localhost:8080/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        alert("Payment submitted successfully!");
      } else {
        alert("Payment submission failed.");
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Select Payment Method</h2>
      <p>Estimated Price: ₹{estimatedPrice.toFixed(2)}</p>

      {paymentMethods.map((method) => (
        <label key={method} className={styles.label}>
          <input
            type="radio"
            name="paymentMethod"
            value={method}
            checked={selectedMethod === method}
            onChange={() => handlePaymentMethodChange(method)}
          />
          {method.replace("_", " ")}
        </label>
      ))}

      {selectedMethod && (
        <div className={styles.paymentMethods}>
          <label>
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
            className={styles.paymentInput}
          />
        </div>
      )}

      <button onClick={handlePaymentSubmit} className={styles.submitButton}>
        Submit Payment
      </button>
    </div>
  );
};

export default ClientPayment;
