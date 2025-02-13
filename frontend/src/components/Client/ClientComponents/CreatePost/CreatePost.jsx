import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { ClientService } from "../../Services/ClientService";
import StorageService from "../../../../util/StorageService";
import CategorySelector from "../../../CategorySelector/CategorySelector"; // Import CategorySelector
import MaterialSelector from "../../../MaterialSelector/MaterialSelector";
import styles from "./CreatePost.module.css"; // Import styles from module CSS

const CreatePost = () => {
  const [selectedCategories, setSelectedCategories] = useState([]); // Store selected categories
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState([]); // Store selected materials
  const [showMaterialSelector, setShowMaterialSelector] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // Store multiple files
  const [imageUrls, setImageUrls] = useState([]); // Store multiple image previews
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null); // Use ref to directly access the file input
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [initiationDate, setInitiationDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array

    // Accumulate previously selected files with the new ones
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

    // Generate URLs for all selected files
    const urls = files.map((file) => URL.createObjectURL(file));

    // Accumulate previously generated URLs with the new ones
    setImageUrls((prevUrls) => [...prevUrls, ...urls]);

    // Reset the input field to allow selecting the same image again
    e.target.value = null;
  };

  const handleDelete = (index, e) => {
    // Prevent file input dialog from opening after the delete
    e.stopPropagation();

    // Remove the file and URL at the specified index
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("itemName", itemName);
    formData.append("description", description);
    formData.append("clientId", StorageService.getUserId());
    formData.append("initiationDate", initiationDate);
    formData.append("completionDate", completionDate);

    selectedCategories.forEach((category, index) => {
      formData.append(`categories[${index}].id`, category.id);
      formData.append(`categories[${index}].name`, category.name);
      formData.append(`categories[${index}].description`, category.description);
    });

    selectedMaterials.forEach((material, index) => {
      formData.append(`materials[${index}].id`, material.id);
      formData.append(`materials[${index}].name`, material.name);
      formData.append(
        `materials[${index}].materialCategory`,
        material.materialCategory
      );
    });

    try {
      const response = await ClientService.postPost(formData);
      if (response.status === 200) {
        notification.success({
          message: "Post Created Successfully",
        });
        navigate("/all-posts");
      } else {
        notification.error({
          message: "Error Creating Post",
          description: response.data.message || "Something went wrong",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error Creating Post",
        description: error.message || "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle closing the category selector
  const handleCloseCategorySelector = () => {
    setShowCategorySelector(false);
    console.log("selected categories.......from create Post");
    console.log(selectedCategories);
  };

  // Function to handle closing the material selector
  const handleCloseMaterialSelector = () => {
    setShowMaterialSelector(false);
    console.log("selected materials.......from create Post");
    console.log(selectedMaterials);
  };

  return (
    <div className={styles.postUploadContainer}>
      <h1 className={styles.uploadHeading}>Create Your Post</h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="images" className={styles.label}></label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            className={styles.fileInput}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <div className={styles.imageUploadBtn}>
            {imageUrls.length > 0 ? (
              <div className={styles.imagePreviewContainer}>
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className={styles.imagePreviewWrapper}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className={styles.imagePreview}
                    />
                    <button
                      type="button"
                      className={styles.deleteBtnCreatePost}
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
            ) : (
              <button
                type="button"
                className={styles.uploadBtn}
                onClick={() => fileInputRef.current.click()}
              >
                Upload Images
              </button>
            )}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="itemName" className={styles.label}>
            Furniture Request
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            placeholder="Enter furniture request"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.inputFieldDes}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <CategorySelector
            selectedCategories={selectedCategories} // Pass selected categories
            setSelectedCategories={setSelectedCategories} // Set selected categories
            onClose={handleCloseCategorySelector}
          />
        </div>

        <div className={styles.inputGroup}>
          <MaterialSelector
            selectedMaterials={selectedMaterials} // Pass selected categories
            setSelectedMaterials={setSelectedMaterials} // Set selected categories
            onClose={handleCloseMaterialSelector} //------------------------>change needed
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="initiationDate" className={styles.label}>
            Set Timeline
          </label>
          <div className={styles.dateInputContainer}>
            <input
              type="date"
              id="initiationDate"
              name="initiationDate"
              value={initiationDate}
              onChange={(e) => setInitiationDate(e.target.value)}
              className={styles.inputFieldDate}
              required
            />
            <span className={styles.dateSeparator}>to</span>
            <input
              type="date"
              id="completionDate"
              name="completionDate"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
              className={styles.inputFieldDate}
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <button
            type="submit"
            className={styles.subBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
