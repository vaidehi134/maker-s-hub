import React, { useState, useRef } from "react";
import axios from "axios"; // Ensure axios is imported
import styles from "./CrafterWorkDialog.module.css";
import { CrafterService } from "../../service/CrafterService";
import StorageService from "../../../../util/StorageService";

// Replace this with your actual API base URL
const BASIC_URL = "http://your-api-url/";

const CrafterWorkDialog = ({ postId, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Store uploaded files
  const [imageUrls, setImageUrls] = useState([]); // Store image previews
  const [comment, setComment] = useState(""); // Store comment input
  const fileInputRef = useRef(null); // Reference for file input
  const crafterId = StorageService.getUserId();

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array

    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setImageUrls((prevUrls) => [
      ...prevUrls,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

    e.target.value = null; // Reset input field
  };

  // Handle image deletion
  const handleDelete = (index, e) => {
    e.stopPropagation();

    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  // Handle form submission
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
      alert("Work submitted successfully!"); // Optional success message
      onClose(); // Close the dialog after successful upload
    } catch (error) {
      console.error("Error uploading work:", error);
      alert("Failed to upload. Please try again.");
    }
  };

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogBox}>
        <h2>Upload Your Work</h2>
        <p>Select and upload your completed work.</p>

        {/* File input */}
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Image preview section */}
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

          {/* Upload button */}
          <div
            className={styles.addImageBtn}
            onClick={() => fileInputRef.current.click()}
          >
            <span>+</span>
          </div>
        </div>

        {/* Comment input */}
        <textarea
          className={styles.commentBox}
          placeholder="Enter your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        {/* Submit & Close buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Submit Work
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrafterWorkDialog;
