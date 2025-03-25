import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UploadCrafterWork.module.css";
import { CrafterService } from "../../service/CrafterService";
import StorageService from "../../../../util/StorageService";
import { notification } from "antd";

const UploadCrafterWork = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [comment, setComment] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const crafterId = StorageService.getUserId();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setImageUrls((prevUrls) => [
      ...prevUrls,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    e.target.value = null;
  };

  const handleDelete = (index, e) => {
    e.stopPropagation();
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handleStatusUpdate = async (status) => {
    try {
      console.log("handleStatusUpdated from handleStatusUpdated...", status);
      const response = await CrafterService.updatePostStatus(status, postId);
      if (response.status === 200) {
        console.log("Status updated to", status);
      } else {
        notification.error({
          message: "Error updating status",
          description: response.data.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      notification.error({
        message: "Error updating status",
        description: error.message || "Something went wrong",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("crafterId", crafterId);
    formData.append("postId", postId);
    formData.append("comment", comment);
    selectedFiles.forEach((file) => formData.append("images", file));

    try {
      await CrafterService.uploadCrafterWork(formData);
      notification.success({
        message: "Work submitted successfully!",
      });

      console.log("awaiting payment...");
      // **Change status to "AWAITING_PAYMENT"**
      await handleStatusUpdate("AWAITING_PAYMENT");

      navigate("/crafter-work");
    } catch (error) {
      console.error("Error uploading work:", error);
      notification.error({
        message: "Failed to upload. Please try again.",
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Upload Your Work</h2>
      <p>Select and upload your completed work.</p>

      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className={styles.imagePreviewContainer}>
        {imageUrls.map((url, index) => (
          <div key={index} className={styles.imagePreviewWrapper}>
            <img
              src={url}
              alt={`Work ${index + 1}`}
              className={styles.imagePreview}
            />
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={(e) => handleDelete(index, e)}
            >
              X
            </button>
          </div>
        ))}
        <div
          className={styles.addImageBtn}
          onClick={() => fileInputRef.current.click()}
        >
          <span>+</span>
        </div>
      </div>

      <textarea
        className={styles.commentBox}
        placeholder="Describe your work...."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <div className={styles.buttonGroup}>
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit Work
        </button>
        <button className={styles.closeButton} onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UploadCrafterWork;
