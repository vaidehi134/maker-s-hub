// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { notification } from "antd";
// import { ClientService } from "../../Services/ClientService";
// import StorageService from "../../../../util/StorageService";
// import "./UpdatePost.css";

// const UpdatePost = () => {
//   const { postId } = useParams(); // Get postId from URL
//   const [post, setPost] = useState(null); // Store the fetched post data
//   const [selectedFiles, setSelectedFiles] = useState([]); // Store newly selected files
//   const [imagePreviews, setImagePreviews] = useState([]); // Preview of newly selected images
//   const [existingImages, setExistingImages] = useState([]); // Store existing images
//   const [itemName, setItemName] = useState("");
//   const [description, setDescription] = useState("");
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   // Fetch post data on component load
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await ClientService.getPostById(postId);
//         const postData = response.data;
//         setPost(postData);
//         setItemName(postData.itemName);
//         setDescription(postData.description);
//         setExistingImages(postData.returnedImages || []);
//       } catch (error) {
//         notification.error({
//           message: "Error",
//           description: "Failed to fetch post details.",
//         });
//       }
//     };
//     fetchPost();
//   }, [postId]);

//   // Handle file input change (for new images)
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedFiles((prev) => [...prev, ...files]);
//     const previews = files.map((file) => URL.createObjectURL(file));
//     setImagePreviews((prev) => [...prev, ...previews]);
//     e.target.value = null;
//   };

//   // Delete an existing image
//   const handleDeleteExistingImage = (index) => {
//     setExistingImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Delete a newly selected image
//   const handleDeleteNewImage = (index) => {
//     setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Convert Base64 to File object
//   const base64ToFile = (base64String, filename = "image.jpg") => {
//     const byteCharacters = atob(base64String); // Decode the base64 string
//     const byteArrays = [];

//     // Convert byte characters to byte array
//     for (let offset = 0; offset < byteCharacters.length; offset++) {
//       byteArrays.push(byteCharacters.charCodeAt(offset));
//     }

//     const byteArray = new Uint8Array(byteArrays);
//     return new File([byteArray], filename, { type: "image/jpeg" }); // Change MIME type if necessary
//   };

//   // Handle form submission for updating post
//   const handleUpdatePost = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     // Append updated fields
//     formData.append("itemName", itemName);
//     formData.append("description", description);
//     formData.append("clientId", StorageService.getUserId());

//     // Append newly selected files
//     selectedFiles.forEach((file) => {
//       formData.append("images", file); // Add new images to "images"
//     });

//     // Convert existing images (Base64) to File objects and append them
//     existingImages.forEach((base64Image, index) => {
//       const file = base64ToFile(base64Image, `existing-image-${index}.jpg`); // Convert Base64 to File
//       formData.append("images", file); // Add existing images as files
//     });

//     // Check the form data in the console
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     try {
//       const response = await ClientService.updatePost(postId, formData);
//       if (response.status === 200) {
//         notification.success({
//           message: "Post Updated Successfully",
//         });
//         navigate("/all-posts");
//       } else {
//         notification.error({
//           message: "Error",
//           description: "Failed to update the post.",
//         });
//       }
//     } catch (error) {
//       notification.error({
//         message: "Error",
//         description: "Failed to update the post.",
//       });
//     }
//   };

//   return (
//     <div className="post-update-container">
//       <h1 className="update-heading">Update Your Post</h1>
//       <form onSubmit={handleUpdatePost} className="form-container">
//         <div className="input-group">
//           <label htmlFor="images" className="label">
//             Images
//           </label>
//           <div className="image-upload-container">
//             {existingImages.length > 0 && (
//               <div className="existing-images">
//                 {existingImages.map((image, index) => (
//                   <div key={index} className="image-preview-wrapper">
//                     <img
//                       src={`data:image/jpeg;base64,${image}`}
//                       alt={`Existing ${index + 1}`}
//                       className="image-preview"
//                     />
//                     <button
//                       type="button"
//                       className="delete-btn"
//                       onClick={() => handleDeleteExistingImage(index)}
//                     >
//                       X
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {imagePreviews.map((preview, index) => (
//               <div key={index} className="image-preview-wrapper">
//                 <img
//                   src={preview}
//                   alt={`New Preview ${index + 1}`}
//                   className="image-preview"
//                 />
//                 <button
//                   type="button"
//                   className="delete-btn"
//                   onClick={() => handleDeleteNewImage(index)}
//                 >
//                   X
//                 </button>
//               </div>
//             ))}

//             <button
//               type="button"
//               className="upload-btn"
//               onClick={() => fileInputRef.current.click()}
//             >
//               Add More Images
//             </button>
//             <input
//               type="file"
//               id="images"
//               name="images"
//               multiple
//               style={{ display: "none" }}
//               ref={fileInputRef}
//               onChange={handleFileChange}
//             />
//           </div>
//         </div>

//         <div className="input-group">
//           <label htmlFor="itemName" className="label">
//             Item Name
//           </label>
//           <input
//             type="text"
//             id="itemName"
//             value={itemName}
//             onChange={(e) => setItemName(e.target.value)}
//             className="input-field"
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label htmlFor="description" className="label">
//             Description
//           </label>
//           <textarea
//             id="description"
//             rows="4"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="input-field-des"
//             required
//           />
//         </div>

//         <div className="input-group">
//           <button type="submit" className="sub-btn">
//             Update Post
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdatePost;

// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { notification } from "antd";
// import { ClientService } from "../../Services/ClientService";
// import StorageService from "../../../../util/StorageService";
// import "./UpdatePost.css";

// const UpdatePost = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);
//   const [itemName, setItemName] = useState("");
//   const [description, setDescription] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   // Fetch post data on component mount
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await ClientService.getPostById(postId);
//         const postData = response.data;
//         setPost(postData);
//         setItemName(postData.itemName);
//         setDescription(postData.description);
//         setExistingImages(postData.returnedImages || []);
//       } catch (error) {
//         notification.error({
//           message: "Error",
//           description: "Failed to fetch post details.",
//         });
//       }
//     };
//     fetchPost();
//   }, [postId]);

//   // Handle file input change
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedFiles((prev) => [...prev, ...files]);
//     const previews = files.map((file) => URL.createObjectURL(file));
//     setImagePreviews((prev) => [...prev, ...previews]);
//     e.target.value = null;
//   };

//   // Delete an existing image
//   const handleDeleteExistingImage = (index) => {
//     setExistingImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Delete a newly selected image
//   const handleDeleteNewImage = (index) => {
//     setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Convert Base64 to File object
//   const base64ToFile = (base64String, filename = "image.jpg") => {
//     const byteCharacters = atob(base64String);
//     const byteArrays = [];
//     for (let offset = 0; offset < byteCharacters.length; offset++) {
//       byteArrays.push(byteCharacters.charCodeAt(offset));
//     }
//     const byteArray = new Uint8Array(byteArrays);
//     return new File([byteArray], filename, { type: "image/jpeg" });
//   };

//   // Handle form submission
//   const handleUpdatePost = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true); // Disable button after submission starts
//     const formData = new FormData();

//     // Append updated fields
//     formData.append("itemName", itemName);
//     formData.append("description", description);
//     formData.append("clientId", StorageService.getUserId());

//     // Append newly selected files
//     selectedFiles.forEach((file) => {
//       formData.append("images", file);
//     });

//     // Convert existing images to File objects and append them
//     existingImages.forEach((base64Image, index) => {
//       const file = base64ToFile(base64Image, `existing-image-${index}.jpg`);
//       formData.append("images", file);
//     });

//     try {
//       const response = await ClientService.updatePost(postId, formData);
//       if (response.status === 200) {
//         notification.success({
//           message: "Post Updated Successfully",
//         });
//         navigate("/all-posts");
//       } else {
//         notification.error({
//           message: "Error",
//           description: "Failed to update the post.",
//         });
//       }
//     } catch (error) {
//       notification.error({
//         message: "Error",
//         description: "Failed to update the post.",
//       });
//     } finally {
//       setIsSubmitting(false); // Re-enable the button if needed
//     }
//   };

//   return (
//     <div className="post-update-container">
//       <h1 className="update-heading">Update Your Post</h1>
//       <form onSubmit={handleUpdatePost} className="form-container">
//         <div className="input-group">
//           <label htmlFor="images" className="label">
//             Images
//           </label>
//           <div className="image-upload-container">
//             {existingImages.length > 0 && (
//               <div className="existing-images">
//                 {existingImages.map((image, index) => (
//                   <div key={index} className="image-preview-wrapper">
//                     <img
//                       src={`data:image/jpeg;base64,${image}`}
//                       alt={`Existing ${index + 1}`}
//                       className="image-preview"
//                     />
//                     <button
//                       type="button"
//                       className="delete-btn"
//                       onClick={() => handleDeleteExistingImage(index)}
//                     >
//                       X
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {imagePreviews.map((preview, index) => (
//               <div key={index} className="image-preview-wrapper">
//                 <img
//                   src={preview}
//                   alt={`New Preview ${index + 1}`}
//                   className="image-preview"
//                 />
//                 <button
//                   type="button"
//                   className="delete-btn"
//                   onClick={() => handleDeleteNewImage(index)}
//                 >
//                   X
//                 </button>
//               </div>
//             ))}

//             <button
//               type="button"
//               className="upload-btn"
//               onClick={() => fileInputRef.current.click()}
//               disabled={isSubmitting} // Disable when submitting
//             >
//               {isSubmitting ? "Uploading..." : "Add More Images"}
//             </button>
//             <input
//               type="file"
//               id="images"
//               name="images"
//               multiple
//               style={{ display: "none" }}
//               ref={fileInputRef}
//               onChange={handleFileChange}
//             />
//           </div>
//         </div>

//         <div className="input-group">
//           <label htmlFor="itemName" className="label">
//             Item Name
//           </label>
//           <input
//             type="text"
//             id="itemName"
//             value={itemName}
//             onChange={(e) => setItemName(e.target.value)}
//             className="input-field"
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label htmlFor="description" className="label">
//             Description
//           </label>
//           <textarea
//             id="description"
//             rows="4"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="input-field-des"
//             required
//           />
//         </div>

//         <div className="input-group">
//           <button
//             type="submit"
//             className="sub-btn"
//             disabled={isSubmitting} // Disable the button
//           >
//             {isSubmitting ? "Updating..." : "Update Post"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdatePost;

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { ClientService } from "../../Services/ClientService";
import StorageService from "../../../../util/StorageService";
import styles from "./UpdatePost.module.css";

const UpdatePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [existingImageFiles, setExistingImageFiles] = useState([]);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Utility function to convert URLs to File objects
  const convertUrlToFile = async (url, filename) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const file = new File([blob], filename, { type: blob.type });
    return file;
  };

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await ClientService.getPostById(postId);
        const postData = response.data;
        setPost(postData);
        setItemName(postData.itemName);
        setDescription(postData.description);
        setExistingImages(postData.imageUrls || []);

        // Convert existing image URLs to File objects
        const existingFiles = await Promise.all(
          postData.imageUrls.map((url, index) =>
            convertUrlToFile(url, `existing-image-${index}`)
          )
        );
        setExistingImageFiles(existingFiles);
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to fetch post details.",
        });
      }
    };
    fetchPost();
  }, [postId]);

  // Handle file selection for new images
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    e.target.value = null;
  };

  // Handle delete for existing images
  const handleDeleteExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setExistingImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle delete for newly selected images
  const handleDeleteNewImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle post update
  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("description", description);
    formData.append("clientId", StorageService.getUserId());

    // Convert new files to FormData and append them
    selectedFiles.forEach((file) => {
      formData.append("images", file); // Append each new file
    });

    // Append existing image files (if they need to be re-uploaded)
    existingImageFiles.forEach((file) => {
      formData.append("images", file); // Append each existing file (converted from URL)
    });

    // Send the formData to the server
    try {
      const response = await ClientService.updatePost(postId, formData);
      if (response.status === 200) {
        notification.success({ message: "Post Updated Successfully" });
        navigate("/all-posts");
      } else {
        notification.error({
          message: "Error",
          description: "Failed to update the post.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to update the post.",
      });
    }
  };

  return (
    <div className={styles.postUpdateContainer}>
      <h1 className={styles.updateHeading}>Update Your Post</h1>
      <form onSubmit={handleUpdatePost} className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="images" className={styles.label}>
            Images
          </label>
          <div className={styles.imageUploadContainer}>
            {existingImages.length > 0 && (
              <div className={styles.existingImages}>
                {existingImages.map((image, index) => (
                  <div key={index} className={styles.imagePreviewWrapper}>
                    <img
                      src={image}
                      alt={`Existing ${index + 1}`}
                      className="image-preview"
                    />
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteExistingImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
            {imagePreviews.map((preview, index) => (
              <div key={index} className={styles.imagePreviewWrapper}>
                <img
                  src={preview}
                  alt={`New Preview ${index + 1}`}
                  className={styles.imagePreview}
                />
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteNewImage(index)}
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={() => fileInputRef.current.click()}
            >
              Add More Images
            </button>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="itemName" className={styles.label}>
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
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
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.inputFieldDes}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <button type="submit" className={styles.subBtn}>
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
