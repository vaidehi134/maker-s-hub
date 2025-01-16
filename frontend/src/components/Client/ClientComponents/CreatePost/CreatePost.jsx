import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { ClientService } from "../../Services/ClientService";
import "./CreatePost.css";
import StorageService from "../../../../util/StorageService";

const CreatePost = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImagePreview(reader.result);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file);
      setSelectedFile(file); // Store the selected file
    } else {
      console.error("No file selected");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", selectedFile);
    formData.append("itemName", itemName);
    formData.append("description", description);
    formData.append("userId", StorageService.getUserId()); // Add userId to the form data

    try {
      const response = await ClientService.postAd(formData);

      if (response.status === 200) {
        notification.success({
          message: "Ad Posted Successfully",
        });
        navigate("/all-posts");
      } else {
        notification.error({
          message: "Error Posting Ad",
          description: response.data.message || "Something went wrong",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error Posting Ad",
        description: error.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="create-post-container">
      <h1>Upload your Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            required
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div
            className="upload-button"
            onClick={() => document.getElementById("image").click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="preview" style={{ width: "100%" }} />
            ) : (
              <button type="button">Upload Image</button>
            )}
          </div>
        </div>

        <div className="form-item">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-item">
          <button type="submit" className="submit-button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
