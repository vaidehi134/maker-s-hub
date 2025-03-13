import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { ClientService } from "../../Services/ClientService";
import StorageService from "../../../../util/StorageService";
import CategorySelector from "../../../CategorySelector/CategorySelector";
import MaterialSelector from "../../../MaterialSelector/MaterialSelector";
import styles from "./UpdatePost.module.css";

const UpdatePost = () => {
  const { postId } = useParams();
  const [existingImages, setExistingImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrlsForNewFiles, setImageUrlsForNewFiles] = useState([]);
  const [deletedPublicIds, setDeletedPublicIds] = useState([]);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  // const [initiationDate, setInitiationDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [showMaterialSelector, setShowMaterialSelector] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showMaterialDialog, setShowMaterialDialog] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  // New state variables for location search
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [location,setLocation] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("updatepost component called ........................");
    const fetchPost = async () => {
      try {
        const response = await ClientService.getPostById(postId);
        if (response.status === 200) {
          const post = response.data;
          setItemName(post.itemName);
          setDescription(post.description);
          // setInitiationDate(post.initiationDate?.split("T")[0] || "");
          setCompletionDate(post.completionDate?.split("T")[0] || "");
          setExistingImages(post.imageDetails || []);
          setSelectedCategories(post.categories || []);
          setSelectedMaterials(post.materials || []);
          setLocationQuery(post.location || "");

          console.log("location : ", locationQuery);
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
    setImageUrlsForNewFiles((prevUrls) => [...prevUrls, ...urls]);
    e.target.value = null;
  };

  // Handle file deletion
  const handleDelete = (item) => {
    if (item.type === "existing") {
      setDeletedPublicIds((prev) => [...prev, item.publicId]);
      setExistingImages((prev) =>
        prev.filter((img) => img.imgPublicId !== item.publicId)
      );
    } else if (item.type === "new") {
      setSelectedFiles((prevFiles) =>
        prevFiles.filter((file, index) => index !== item.index)
      );
      setImageUrlsForNewFiles((prevUrls) =>
        prevUrls.filter((url, index) => index !== item.index)
      );
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();

    // Append new files
    selectedFiles.forEach((file) => formData.append("images", file));

    // Append other fields
    formData.append("itemName", itemName);
    formData.append("description", description);
    formData.append("clientId", StorageService.getUserId());
    // formData.append("initiationDate", initiationDate);
    formData.append("completionDate", completionDate);
    formData.append("location", location);

    if (selectedLocation) {
      formData.append("latitude", selectedLocation.lat);
      formData.append("longitude", selectedLocation.lon);
    }

    // Append deleted public IDs as a JSON string
    formData.append("deletedPublicIds", JSON.stringify(deletedPublicIds));

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

  // New function to fetch location suggestions
  const fetchLocationSuggestions = async (query) => {
    try {
      const response = await ClientService.getLocationSuggestions(query);
      setLocationSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setLocationSuggestions([]);
    }
  };

  // Add debouncing for location search
  useEffect(() => {
    if (locationQuery.trim() === "") {
      setLocationSuggestions([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      fetchLocationSuggestions(locationQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [locationQuery]);

  // Handle location selection
  const handleLocationSelect = (location) => {
    setLocationQuery(location.display_name);
    setLocation(location.display_name);
    setSelectedLocation(location);
    setLocationSuggestions([]);
  };

  // Display images
  const displayImages = useMemo(() => {
    return [
      ...existingImages.map((img) => ({
        type: "existing",
        url: img.imgUrl,
        publicId: img.imgPublicId,
        key: img.imgPublicId,
      })),
      ...selectedFiles.map((file, index) => ({
        type: "new",
        file,
        url: imageUrlsForNewFiles[index],
        key: `new-${index}`,
        index: index,
      })),
    ];
  }, [existingImages, selectedFiles, imageUrlsForNewFiles]);

  // Set the minimum date to today's date
  const today = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  // Handle closing the category selector
  const handleCloseCategorySelector = () => {
    setShowCategorySelector(false);
    console.log("Selected Categories:", selectedCategories);
  };

  // Handle closing the material selector
  const handleCloseMaterialSelector = () => {
    setShowMaterialSelector(false);
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
            {imageUrlsForNewFiles.length > 0 || existingImages.length > 0 ? (
              <div className={styles.imagePreviewContainer}>
                {displayImages.map((item) => (
                  <div
                    key={item.key}
                    className={styles.imagePreviewWrapper}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={item.url}
                      alt={`Preview ${item.key}`}
                      className={styles.imagePreview}
                    />
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(item)}
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

        {/* Location search section */}
        <div className={styles.inputGroup}>
          <label htmlFor="location" className={styles.label}>
            Location
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter city"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className={styles.inputField}
            />

            {locationSuggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  zIndex: 10,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {locationSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderBottom: "1px solid #ddd",
                    }}
                    onClick={() => handleLocationSelect(suggestion)}
                  >
                    {suggestion.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <button
            className={styles.buttonGroup}
            onClick={() => setShowCategoryDialog(true)}
            type="button"
          >
            Choose Categories
          </button>
        </div>

        {/* CategorySelector with controlled dialog */}
        <CategorySelector
          open={showCategoryDialog}
          onClose={() => setShowCategoryDialog(false)}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <div className={styles.inputGroup}>
          <button
            className={styles.buttonGroup}
            onClick={() => setShowMaterialDialog(true)}
            type="button"
          >
            Choose Materials
          </button>
        </div>

        {/* MaterialSelector with controlled dialog */}
        <MaterialSelector
          open={showMaterialDialog}
          onClose={() => setShowMaterialDialog(false)}
          selectedMaterials={selectedMaterials}
          setSelectedMaterials={setSelectedMaterials}
        />

        {/* Timeline Fields */}
        <div className={styles.inputGroup}>
          <label htmlFor="initiationDate" className={styles.label}>
            Set Completion Time
          </label>
          <div className={styles.dateInputContainer}>
            {/* <input
              type="date"
              id="initiationDate"
              name="initiationDate"
              value={initiationDate}
              onChange={(e) => setInitiationDate(e.target.value)}
              className={styles.inputFieldDate}
              required
              min={today}
            /> */}
            {/* <span className={styles.dateSeparator}>to</span> */}
            <input
              type="date"
              id="completionDate"
              name="completionDate"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
              className={styles.inputFieldDate}
              required
              min={today}
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
