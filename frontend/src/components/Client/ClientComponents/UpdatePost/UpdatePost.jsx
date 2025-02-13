import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { ClientService } from "../../Services/ClientService";
import StorageService from "../../../../util/StorageService";
import CategorySelector from "../../../CategorySelector/CategorySelector";
import MaterialSelector from "../../../MaterialSelector/MaterialSelector";
import styles from "./UpdatePost.module.css";

const UpdatePost = () => {
  const { postId } = useParams(); // Get postId from URL
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [initiationDate, setInitiationDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [showCategorySelector, setShowCategorySelector] = useState(false); // Manage category dialog visibility
  const [showMaterialSelector, setShowMaterialSelector] = useState(false); // Manage material dialog visibility
  const navigate = useNavigate();

  // Fetch post data when the component mounts
  useEffect(() => {
    console.log("updatepost component called ........................");
    const fetchPost = async () => {
      try {
        const response = await ClientService.getPostById(postId);
        if (response.status === 200) {
          const post = response.data;
          setItemName(post.itemName);
          setDescription(post.description);
          setImageUrls(post.imageUrls || []);
          setInitiationDate(post.initiationDate?.split("T")[0] || ""); // Format date
          setCompletionDate(post.completionDate?.split("T")[0] || ""); // Format date
          setSelectedCategories(post.categories || []);
          setSelectedMaterials(post.materials || []);

          console.log("timeline.........");
          console.log("initiation date", post.initiationDate);
          console.log("completion date", post.completionDate);
        }
      } catch (error) {
        notification.error({
          message: "Error fetching post",
          description: error.message,
        });
      }
    };
    fetchPost();
  }, [postId]);

  // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls((prevUrls) => [...prevUrls, ...urls]);
    e.target.value = null;
  };

  // Handle file deletion
  const handleDelete = (index, e) => {
    e.stopPropagation();
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  // Handle form submission
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
      const response = await ClientService.updatePost(postId, formData);
      if (response.status === 200) {
        notification.success({ message: "Post Updated Successfully" });
        navigate("/all-posts");
      } else {
        notification.error({ message: "Error Updating Post" });
      }
    } catch (error) {
      notification.error({
        message: "Error Updating Post",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle closing the category selector
  const handleCloseCategorySelector = () => {
    setShowCategorySelector(false); // Hide the category dialog
    console.log("Selected Categories:", selectedCategories);
  };

  // Handle closing the material selector
  const handleCloseMaterialSelector = () => {
    setShowMaterialSelector(false); // Hide the material dialog
    console.log("Selected Materials:", selectedMaterials);
  };

  // Handle delete category from the list
  const handleDeleteCategory = (categoryId) => {
    setSelectedCategories(
      selectedCategories.filter((category) => category.id !== categoryId)
    );
  };

  // Handle delete material from the list
  const handleDeleteMaterial = (materialId) => {
    setSelectedMaterials(
      selectedMaterials.filter((material) => material.id !== materialId)
    );
  };

  return (
    <div className={styles.postUploadContainer}>
      <h1 className={styles.uploadHeading}>Update Your Post</h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {/* Image Upload Section */}
        <div className={styles.inputGroup}>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <div className={styles.imageUploadBtn}>
            {imageUrls.length > 0 ? (
              <div className={styles.imagePreviewContainer}>
                {imageUrls.map((url, index) => (
                  <div key={index} className={styles.imagePreviewWrapper}>
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
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

        {/* Furniture Request Field */}
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

        {/* Description Field */}
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

        {/* Category Selector */}
        <div className={styles.inputGroup}>
          <CategorySelector
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            onClose={handleCloseCategorySelector}
          />
        </div>

        {/* Material Selector */}
        <div className={styles.inputGroup}>
          <MaterialSelector
            selectedMaterials={selectedMaterials}
            setSelectedMaterials={setSelectedMaterials}
            onClose={handleCloseMaterialSelector}
          />
        </div>

        {/* Timeline Fields */}
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

        {/* Submit Button */}
        <div className={styles.inputGroup}>
          <button
            type="submit"
            className={styles.subBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
