// import React, { useState, useEffect, useCallback } from "react";
// import { FaSearch, FaArrowRight } from "react-icons/fa";
// import styles from "./CrafterAllPosts.module.css";
// import { notification } from "antd";
// import CategorySelector from "../../../CategorySelector/CategorySelector";
// import MaterialSelector from "../../../MaterialSelector/MaterialSelector";
// import { useNavigate } from "react-router-dom";
// import StorageService from "../../../../util/StorageService";
// import { CrafterService } from "../../service/CrafterService";
// import { ClientService } from "../../../Client/Services/ClientService";

// const CrafterAllPosts = () => {
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [showCategoryDialog, setShowCategoryDialog] = useState(false);
//   const [selectedMaterials, setSelectedMaterials] = useState([]);
//   const [showMaterialDialog, setShowMaterialDialog] = useState(false);
//   const [locationQuery, setLocationQuery] = useState("");
//   const [locationSuggestions, setLocationSuggestions] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null); //for double location
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [query, setQuery] = useState("");
//   const currentUserId = StorageService.getUserId();
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleSearch = () => {
//     handleFindPosts();
//   };

//   useEffect(() => {
//     handleFindPosts();
//   }, [selectedCategories, selectedMaterials, selectedLocation]);

//   const fetchLocationSuggestions = async (query) => {
//     try {
//       const response = await ClientService.getLocationSuggestions(query);
//       setLocationSuggestions(response.data);
//     } catch (error) {
//       console.error("Error fetching location suggestions:", error);
//       setLocationSuggestions([]);
//     }
//   };

//   useEffect(() => {
//     if (locationQuery.trim() === "") {
//       setSelectedLocation(null); // Reset selected location
//       handleFindPosts(); // Trigger search without location
//     }
//   }, [locationQuery]);

//   useEffect(() => {
//     if (locationQuery.trim() === "") {
//       setLocationSuggestions([]);
//       return;
//     }

//     const debounceTimer = setTimeout(() => {
//       fetchLocationSuggestions(locationQuery);
//     }, 300);

//     return () => clearTimeout(debounceTimer);
//   }, [locationQuery]);

//   const handleLocationSelect = (location) => {
//     if (!location) {
//       setSelectedLocation(null);
//       setLocationQuery("");
//       handleFindPosts();
//       return;
//     }
//     // Existing logic for valid selections
//     setLocationQuery(location.display_name);
//     setSelectedLocation(location);
//     setLocationSuggestions([]);
//     handleFindPosts();
//   };

//   const handleFindPosts = async () => {
//     const crafterRequestDto = {
//       crafterId: StorageService.getUserId(),
//       categories: selectedCategories.map((category) => ({
//         id: category.id,
//         name: category.name,
//         description: category.description,
//       })),
//       materials: selectedMaterials.map((material) => ({
//         id: material.id,
//         name: material.name,
//         materialCategory: material.materialCategory,
//       })),
//       itemName: query,
//       longitude: selectedLocation?.lon,
//       latitude: selectedLocation?.lat,
//     };

//     console.log("longitude: ", crafterRequestDto.longitude);
//     console.log("latitude :", crafterRequestDto.latitude);

//     try {
//       setIsSubmitting(true);
//       const response = await CrafterService.getAllPosts(crafterRequestDto);
//       if (response.status === 200) {
//         setPosts(response.data);
//       } else {
//         notification.error({
//           message: "Error fetching Posts",
//           description: response.data.message || "Something went wrong",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       notification.error({
//         message: "Error fetching Posts",
//         description: error.message || "Something went wrong",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Show posts excluding those with status ASSIGNED or COMPLETED
//   const filteredPosts = posts.filter(
//     (post) =>
//       // post.postStatus !== "ASSIGNED" &&
//       // post.postStatus !== "COMPLETED" &&
//       // post.postStatus !== "IN_PROGRESS"
//       post.postStatus === "PENDING" || post.postStatus === "ACCEPTED"
//   );

//   const getImageSrc = (imgUrl) => imgUrl;

//   const handleSeeDetailsClick = (
//     postId,
//     postStatus,
//     postAcceptingCrafterId
//   ) => {
//     const isPostAcceptedByCurrentUser =
//       postAcceptingCrafterId?.includes(currentUserId);
//     navigate(`/crafter-proposal/${postId}`, {
//       state: {
//         postStatus,
//         isPostAcceptingCrafter: isPostAcceptedByCurrentUser,
//       },
//     });
//   };

//   return (
//     <div className={styles.allPosts}>
//       <div className={styles.searchContainer}>
//         <div style={{ position: "relative" }}>
//           <input
//             type="text"
//             className={styles.searchInput}
//             placeholder="Enter city"
//             value={locationQuery}
//             onChange={(e) => setLocationQuery(e.target.value)}
//             // Add clear button functionality
//             onClick={(e) => {
//               if (e.target.value === "") {
//                 setSelectedLocation(null);
//                 handleFindPosts();
//               }
//             }}
//           />

//           {locationSuggestions.length > 0 && (
//             <div
//               style={{
//                 position: "absolute",
//                 width: "100%",
//                 backgroundColor: "white",
//                 border: "1px solid #ddd",
//                 zIndex: 10,
//                 boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               }}
//             >
//               {locationSuggestions.map((suggestion, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     padding: "8px 12px",
//                     cursor: "pointer",
//                     borderBottom: "1px solid #ddd",
//                   }}
//                   onClick={() => handleLocationSelect(suggestion)}
//                 >
//                   {suggestion.display_name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <button
//           className={styles.buttonGroup}
//           onClick={() => setShowCategoryDialog(true)}
//         >
//           Choose Categories
//         </button>

//         <button
//           className={styles.buttonGroup}
//           onClick={() => setShowMaterialDialog(true)}
//         >
//           Choose Materials
//         </button>

//         <div className={styles.searchWrapper}>
//           <input
//             type="text"
//             className={styles.searchInput}
//             placeholder="Search posts..."
//             value={query}
//             onChange={handleInputChange}
//           />
//           <div className={styles.searchIcon}>
//             <FaSearch />
//           </div>
//           <button onClick={handleSearch} className={styles.searchButton}>
//             <FaArrowRight />
//           </button>
//         </div>
//       </div>

//       {/* CategorySelector with controlled dialog */}
//       <CategorySelector
//         open={showCategoryDialog}
//         onClose={() => setShowCategoryDialog(false)}
//         selectedCategories={selectedCategories}
//         setSelectedCategories={setSelectedCategories}
//       />

//       <MaterialSelector
//         open={showMaterialDialog}
//         onClose={() => setShowMaterialDialog(false)}
//         selectedMaterials={selectedMaterials}
//         setSelectedMaterials={setSelectedMaterials}
//       />

//       {filteredPosts.length === 0 ? (
//         <h1 className={styles.noPostAvailable}>No Posts Available</h1>
//       ) : (
//         <div className={styles.postList}>
//           {filteredPosts.map((post) => (
//             <div key={post.id} className={styles.postItem}>
//               <div className={styles.postImage}>
//                 {post.imageDetails?.map((imgDetail, index) => (
//                   <img
//                     key={index}
//                     className="post-image"
//                     src={imgDetail.imgUrl}
//                     alt={`Post ${post.id} Image ${index + 1}`}
//                     onError={(e) => {
//                       e.target.src = "/path/to/placeholder-image.jpg";
//                     }}
//                   />
//                 ))}
//               </div>
//               <div className="post-details">
//                 <h2 className="post-title">{post.itemName}</h2>
//               </div>

//               <div className={styles.postAction}>
//                 {post.postStatus === "ACCEPTED" ? (
//                   post.postAcceptingCrafterId?.includes(currentUserId) ? (
//                     <>
//                       <button
//                         className={styles.updateButton}
//                         onClick={() =>
//                           handleSeeDetailsClick(
//                             post.id,
//                             post.postStatus,
//                             post.postAcceptingCrafterId
//                           )
//                         }
//                       >
//                         See Details
//                       </button>
//                       <p>No Client has accepted your request</p>
//                     </>
//                   ) : (
//                     <button
//                       className={styles.updateButton}
//                       onClick={() =>
//                         handleSeeDetailsClick(
//                           post.id,
//                           post.postStatus,
//                           post.postAcceptingCrafterId
//                         )
//                       }
//                     >
//                       see Details
//                     </button>
//                   )
//                 ) : (
//                   <button
//                     className={styles.updateButton}
//                     onClick={() =>
//                       handleSeeDetailsClick(
//                         post.id,
//                         post.postStatus,
//                         post.postAcceptingCrafterId
//                       )
//                     }
//                   >
//                     see Details
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CrafterAllPosts;

import React, { useState, useEffect, useCallback } from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import styles from "./CrafterAllPosts.module.css";
import { notification } from "antd";
import CategorySelector from "../../../CategorySelector/CategorySelector";
import MaterialSelector from "../../../MaterialSelector/MaterialSelector";
import { useNavigate } from "react-router-dom";
import StorageService from "../../../../util/StorageService";
import { CrafterService } from "../../service/CrafterService";
import { ClientService } from "../../../Client/Services/ClientService";

const CrafterAllPosts = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [showMaterialDialog, setShowMaterialDialog] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null); //for double location
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const currentUserId = StorageService.getUserId();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    handleFindPosts();
  };

  useEffect(() => {
    handleFindPosts();
  }, [selectedCategories, selectedMaterials, selectedLocation]);

  const fetchLocationSuggestions = async (query) => {
    try {
      const response = await ClientService.getLocationSuggestions(query);
      setLocationSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setLocationSuggestions([]);
    }
  };

  useEffect(() => {
    if (locationQuery.trim() === "") {
      setSelectedLocation(null); // Reset selected location
      handleFindPosts(); // Trigger search without location
    }
  }, [locationQuery]);

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

  const handleLocationSelect = (location) => {
    if (!location) {
      setSelectedLocation(null);
      setLocationQuery("");
      handleFindPosts();
      return;
    }
    // Existing logic for valid selections
    setLocationQuery(location.display_name);
    setSelectedLocation(location);
    setLocationSuggestions([]);
    handleFindPosts();
  };

  const handleFindPosts = async () => {
    const crafterRequestDto = {
      crafterId: StorageService.getUserId(),
      categories: selectedCategories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
      })),
      materials: selectedMaterials.map((material) => ({
        id: material.id,
        name: material.name,
        materialCategory: material.materialCategory,
      })),
      itemName: query,
      longitude: selectedLocation?.lon,
      latitude: selectedLocation?.lat,
    };

    console.log("longitude: ", crafterRequestDto.longitude);
    console.log("latitude :", crafterRequestDto.latitude);

    try {
      setIsSubmitting(true);
      const response = await CrafterService.getAllPosts(crafterRequestDto);
      if (response.status === 200) {
        console.log(response.data);
        
        setPosts(response.data);
      } else {
        notification.error({
          message: "Error fetching Posts",
          description: response.data.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      notification.error({
        message: "Error fetching Posts",
        description: error.message || "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.postStatus === "PENDING" || post.postStatus === "ACCEPTED"
  );

  const getImageSrc = (imgUrl) => imgUrl;

  const handleSeeDetailsClick = (
    postId,
    postStatus,
    postAcceptingCrafterId
  ) => {
    const isPostAcceptedByCurrentUser =
      postAcceptingCrafterId?.includes(currentUserId);
    navigate(`/crafter-proposal/${postId}`, {
      state: {
        postStatus,
        isPostAcceptingCrafter: isPostAcceptedByCurrentUser,
      },
    });
  };

  return (
    <div className={styles.allPosts}>
      <div className={styles.searchContainer}>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Enter city"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            // Add clear button functionality
            onClick={(e) => {
              if (e.target.value === "") {
                setSelectedLocation(null);
                handleFindPosts();
              }
            }}
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

        <button
          className={styles.buttonGroup}
          onClick={() => setShowCategoryDialog(true)}
        >
          Choose Categories
        </button>

        <button
          className={styles.buttonGroup}
          onClick={() => setShowMaterialDialog(true)}
        >
          Choose Materials
        </button>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search posts..."
            value={query}
            onChange={handleInputChange}
          />
          <div className={styles.searchIcon}>
            <FaSearch />
          </div>
          <button onClick={handleSearch} className={styles.searchButton}>
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* CategorySelector with controlled dialog */}
      <CategorySelector
        open={showCategoryDialog}
        onClose={() => setShowCategoryDialog(false)}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <MaterialSelector
        open={showMaterialDialog}
        onClose={() => setShowMaterialDialog(false)}
        selectedMaterials={selectedMaterials}
        setSelectedMaterials={setSelectedMaterials}
      />

      {filteredPosts.length === 0 ? (
        <h1 className={styles.noPostAvailable}>No Posts Available</h1>
      ) : (
        <div className={styles.postList}>
          {/* <div className={styles.postContent}> */}
          {filteredPosts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              <div className={styles.postContent}>
              <div className={styles.postImage}>
                {post.imageDetails?.length > 0 && (
                  <img
                    className={styles.postImage}
                    src={post.imageDetails[0].imgUrl} // Display only the first image
                    alt={`Post ${post.id} Image`}
                    onError={(e) => {
                      e.target.src = "/path/to/placeholder-image.jpg";
                    }}
                  />
                )}
              </div>

              <div className="{styles.postDetails}">
                <h2 className="{styles.postTitle}">{post.itemName}</h2>
              </div>

              {post.postStatus === "ACCEPTED" ? (
                post.postAcceptingCrafterId?.includes(currentUserId) ? (
                  <div className={styles.postAction}>
                    <p>No Client has accepted your request</p>
                    <button
                      className={styles.updateButton}
                      onClick={() =>
                        handleSeeDetailsClick(
                          post.id,
                          post.postStatus,
                          post.postAcceptingCrafterId
                        )
                      }
                    >
                      See Details
                    </button>
                  </div>
                ) : (
                   <div className={styles.postAction}>
                  <button
                    className={styles.updateButton}
                    onClick={() =>
                      handleSeeDetailsClick(
                        post.id,
                        post.postStatus,
                        post.postAcceptingCrafterId
                      )
                    }
                  >
                    see Details
                  </button>
                  </div>
                )
              ) : (
                <div className={styles.postAction}>
                <button
                  className={styles.updateButton}
                  onClick={() =>
                    handleSeeDetailsClick(
                      post.id,
                      post.postStatus,
                      post.postAcceptingCrafterId
                    )
                  }
                >
                  see Details
                </button>
                </div>
              )}
              </div>
            </div>
          ))}
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default CrafterAllPosts;

