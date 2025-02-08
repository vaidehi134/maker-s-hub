// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { notification } from "antd";
// // import { ClientService } from "../../Services/ClientService";
// // import "./CreatePost.css";
// // import StorageService from "../../../../util/StorageService";

// // const CreatePost = () => {
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [imagePreview, setImagePreview] = useState("");
// //   const [itemName, setItemName] = useState("");
// //   const [description, setDescription] = useState("");
// //   const navigate = useNavigate();

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();

// //       reader.onload = () => {
// //         setImagePreview(reader.result);
// //       };

// //       reader.onerror = (error) => {
// //         console.error("Error reading file:", error);
// //       };

// //       reader.readAsDataURL(file);
// //       setSelectedFile(file); // Store the selected file
// //     } else {
// //       console.error("No file selected");
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const formData = new FormData();
// //     formData.append("img", selectedFile);
// //     formData.append("itemName", itemName);
// //     formData.append("description", description);
// //     formData.append("clientId", StorageService.getUserId()); // Add userId to the form data

// //     try {
// //       const response = await ClientService.postAd(formData);

// //       if (response.status === 200) {
// //         notification.success({
// //           message: "Ad Posted Successfully",
// //         });
// //         navigate("/all-posts");
// //       } else {
// //         notification.error({
// //           message: "Error Posting Ad",
// //           description: response.data.message || "Something went wrong",
// //         });
// //       }
// //     } catch (error) {
// //       notification.error({
// //         message: "Error Posting Ad",
// //         description: error.message || "Something went wrong",
// //       });
// //     }
// //   };

// //   return (
// //     <div className="post-upload-container">
// //       <h1 className="upload-heading">Create Your Post</h1>
// //       <form onSubmit={handleSubmit} className="form-container">
// //         <div className="input-group">
// //           <label htmlFor="image" className="label">
// //             Image
// //           </label>
// //           <input
// //             type="file"
// //             id="image"
// //             name="image"
// //             required
// //             onChange={handleFileChange}
// //             className="file-input"
// //             style={{ display: "none" }} //it's not directly visible on the page.
// //           />
// //           <div
// //             className="image-upload-btn"
// //             onClick={() => document.getElementById("image").click()}

// //             //When the onClick event is triggered, it calls document.getElementById("image").click(),
// //             // which simulates a click on the file input. This triggers the onChange event of the file input element,
// //             // opening the file selection dialog box for the user to select an image.
// //           >
// //             {imagePreview ? (
// //               <img src={imagePreview} alt="preview" className="image-preview" />
// //             ) : (
// //               <button type="button" className="upload-btn">
// //                 Upload Image
// //               </button>
// //             )}
// //           </div>
// //         </div>

// //         <div className="input-group">
// //           <label htmlFor="itemName" className="label">
// //             Item Name
// //           </label>
// //           <input
// //             type="text"
// //             id="itemName"
// //             name="itemName"
// //             placeholder="Enter item name"
// //             value={itemName}
// //             onChange={(e) => setItemName(e.target.value)}
// //             className="input-field"
// //             required
// //           />
// //         </div>

// //         <div className="input-group">
// //           <label htmlFor="description" className="label">
// //             Description
// //           </label>
// //           <textarea
// //             id="description"
// //             name="description"
// //             placeholder="Enter description"
// //             rows="4"
// //             value={description}
// //             onChange={(e) => setDescription(e.target.value)}
// //             className="input-field-des"
// //             required
// //           />
// //         </div>

// //         <div className="input-group">
// //           <button type="submit" className="sub-btn">
// //             Add Post
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CreatePost;

// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { notification } from "antd";
// import { ClientService } from "../../Services/ClientService";
// import "./CreatePost.css";
// import StorageService from "../../../../util/StorageService";

// const CreatePost = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]); // Store multiple files
//   const [imagePreviews, setImagePreviews] = useState([]); // Store multiple image previews
//   const [itemName, setItemName] = useState("");
//   const [description, setDescription] = useState("");
//   const fileInputRef = useRef(null); // Use ref to directly access the file input
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files); // Convert FileList to an array
//     console.log("Selected Files:", files); // Log selected files

//     // Accumulate previously selected files with the new ones
//     setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

//     // Generate previews for all selected files
//     const previews = files.map((file) => URL.createObjectURL(file));
//     console.log("Generated Previews:", previews); // Log previews

//     // Accumulate previously generated previews with the new ones
//     setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);

//     // Reset the input field to allow selecting the same image again
//     e.target.value = null;
//   };

//   const handleDelete = (index, e) => {
//     // Prevent file input dialog from opening after the delete
//     e.stopPropagation();

//     // Remove the file at the specified index from the selectedFiles state
//     setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

//     // Remove the preview at the specified index from the imagePreviews state
//     setImagePreviews((prevPreviews) =>
//       prevPreviews.filter((_, i) => i !== index)
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     selectedFiles.forEach((file) => {
//       formData.append("images", file); // Append all files
//       console.log("Appended File:", file); // Log each appended file
//     });

//     formData.append("itemName", itemName);
//     formData.append("description", description);
//     formData.append("clientId", StorageService.getUserId()); // Add userId

//     try {
//       const response = await ClientService.postPost(formData);

//       if (response.status === 200) {
//         notification.success({
//           message: "Post Posted Successfully",
//         });
//         navigate("/all-posts");
//       } else {
//         notification.error({
//           message: "Error Posting Post",
//           description: response.data.message || "Something went wrong",
//         });
//       }
//     } catch (error) {
//       notification.error({
//         message: "Error Posting Post",
//         description: error.message || "Something went wrong",
//       });
//     }
//   };

//   return (
//     <div className="post-upload-container">
//       <h1 className="upload-heading">Create Your Post</h1>
//       <form onSubmit={handleSubmit} className="form-container">
//         <div className="input-group">
//           <label htmlFor="images" className="label">
//             Images
//           </label>
//           <input
//             type="file"
//             id="images"
//             name="images"
//             multiple // Allow multiple files
//             // required
//             onChange={handleFileChange}
//             className="file-input"
//             style={{ display: "none" }}
//             ref={fileInputRef} // Attach ref to file input
//           />
//           <div className="image-upload-btn">
//             {imagePreviews.length > 0 ? (
//               <div className="image-preview-container">
//                 {imagePreviews.map((preview, index) => (
//                   <div
//                     key={index}
//                     className="image-preview-wrapper"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <img
//                       src={preview}
//                       alt={`Preview ${index + 1}`}
//                       className="image-preview"
//                     />
//                     <button
//                       type="button"
//                       className="delete-btn"
//                       onClick={(e) => handleDelete(index, e)} // Pass event to handleDelete
//                     >
//                       X
//                     </button>
//                   </div>
//                 ))}
//                 {/* Add "+" button to upload more images */}
//                 <div
//                   className="add-image-btn"
//                   onClick={() => fileInputRef.current.click()} // Trigger file input click using ref
//                 >
//                   <span>+</span>
//                 </div>
//               </div>
//             ) : (
//               <button
//                 type="button"
//                 className="upload-btn"
//                 onClick={() => fileInputRef.current.click()} // Trigger file input click using ref
//               >
//                 Upload Images
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="input-group">
//           <label htmlFor="itemName" className="label">
//             Item Name
//           </label>
//           <input
//             type="text"
//             id="itemName"
//             name="itemName"
//             placeholder="Enter item name"
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
//             name="description"
//             placeholder="Enter description"
//             rows="4"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="input-field-des"
//             required
//           />
//         </div>

//         <div className="input-group">
//           <button type="submit" className="sub-btn">
//             Add Post
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { ClientService } from "../../Services/ClientService";
import "./CreatePost.css";
import StorageService from "../../../../util/StorageService";

const CreatePost = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Store multiple files
  const [imageUrls, setImageUrls] = useState([]); // Store multiple image previews
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null); // Use ref to directly access the file input
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
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("images", file); // Append all files
    });

    formData.append("itemName", itemName);
    formData.append("description", description);
    formData.append("clientId", StorageService.getUserId()); // Add userId

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
    }
  };

  return (
    <div className="post-upload-container">
      <h1 className="upload-heading">Create Your Post</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <label htmlFor="images" className="label">
            Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            className="file-input"
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <div className="image-upload-btn">
            {imageUrls.length > 0 ? (
              <div className="image-preview-container">
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="image-preview-wrapper"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="image-preview"
                    />
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={(e) => handleDelete(index, e)}
                    >
                      X
                    </button>
                  </div>
                ))}
                <div
                  className="add-image-btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  <span>+</span>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="upload-btn"
                onClick={() => fileInputRef.current.click()}
              >
                Upload Images
              </button>
            )}
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="itemName" className="label">
            Furniture Request
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            placeholder="Enter furniture request"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="description" className="label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field-des"
            required
          />
        </div>

        <div className="input-group">
          <button type="submit" className="sub-btn">
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
