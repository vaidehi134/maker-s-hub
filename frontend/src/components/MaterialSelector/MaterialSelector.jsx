import React, { useEffect, useState } from "react";
import { notification } from "antd";
import StorageService from "../../util/StorageService";
import axios from "axios";
import styles from "./MaterialSelector.module.css"; // Import the CSS Module

const MaterialSelector = ({
  selectedMaterials,
  setSelectedMaterials,
  onClose,
}) => {
  const [materials, setMaterials] = useState([]); // Store materials
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Store search query

  // Function to create Authorization header
  const createAuthorizationHeader = () => {
    const token = StorageService.getToken();
    console.log("Retrieved Token:", token);
    return { Authorization: `Bearer ${token}` }; // Fixed token format
  };

  useEffect(() => {
    console.log("Updated selected materials:", selectedMaterials);
  }, [selectedMaterials]);

  // Fetch materials when the button is clicked
  const handleOpenDialog = async () => {
    console.log("Fetching materials...");

    try {
      const response = await axios.get(
        "http://localhost:8080/api/materials/material", // Adjust your backend URL as needed
        {
          headers: createAuthorizationHeader(),
        }
      );
      console.log("Fetched Materials:", response.data);
      setMaterials(response.data); // Update state with fetched materials
      setShowDialog(true); // Show the dialog after fetching data
    } catch (error) {
      notification.error({
        message: "Error fetching materials",
        description:
          error.message || "Something went wrong while fetching materials",
      });
    }
  };

  // Filter materials based on the search query
  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle selecting a material
  const handleSelectMaterial = (material) => {
    if (selectedMaterials.some((mat) => mat.id === material.id)) {
      setSelectedMaterials(
        selectedMaterials.filter((mat) => mat.id !== material.id)
      );
    } else {
      setSelectedMaterials([...selectedMaterials, material]); // Add the whole material object
    }
    console.log("Selected Materials:", selectedMaterials);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setShowDialog(false);
    onClose(); // Call the onClose function from CreatePost
  };

  // // Handle deleting a material
  // const handleDeleteMaterial = (materialId) => {
  //   setSelectedMaterials(selectedMaterials.filter((id) => id !== materialId));
  // };

   const handleDeleteMaterial = (materialId) => {
     //e.stopPropagation(); // Prevent event from propagating
     setSelectedMaterials(
       selectedMaterials.filter((mat) => mat.id !== materialId)
     );
   };

  return (
    <div className={styles.materialSelector}>
      <button
        className={styles.button}
        onClick={handleOpenDialog}
        type="button"
      >
        Choose Materials
      </button>

      {/* Selected Materials as Tags */}
      <div className={styles.selectedMaterials}>
        {selectedMaterials.map((material) => (
          <span key={material.id} className={styles.materialTag}>
            {material.name}
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteMaterial(material.id)}
              type="button"
            >
              ✖
            </button>
          </span>
        ))}
      </div>

      {/* Material selection dialog */}
      {showDialog && (
        <div className={styles.dialog}>
          <div className={styles.dialogContent}>
            <h3>Select Materials</h3>
            <button
              className={styles.button}
              onClick={handleCloseDialog}
              type="button"
            >
              Close
            </button>

            {/* Search bar */}
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />

            {/* Material list */}
            <div>
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map((material) => (
                  <div key={material.id}>
                    <span>
                      <label className={styles.materialName}>
                        {material.name}
                      </label>
                      <input
                        className={styles.materialCheckBox}
                        type="checkbox"
                        checked={selectedMaterials.some(
                          (mat) => mat.id === material.id
                        )}
                        onChange={() => handleSelectMaterial(material)} // Pass the whole material to handleSelectMaterial
                      />
                    </span>
                  </div>
                ))
              ) : (
                <p>No materials found matching your search.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialSelector;
