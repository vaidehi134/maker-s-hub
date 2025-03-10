import React, { useEffect, useState } from "react";
import styles from "./PostDetails.module.css";
import { CrafterService } from "../../service/CrafterService";
import { useParams } from "react-router-dom";
import { notification, Modal } from "antd";

const PostDetails = ({ postId: propPostId }) => {
  const { postId: urlPostId } = useParams();
  const postId = propPostId || urlPostId;

  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [existingImages, setExistingImages] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await CrafterService.getPostById(postId);
        if (response.status === 200) {
          const post = response.data;
          setItemName(post.itemName);
          setDescription(post.description);
          setCompletionDate(post.completionDate?.split("T")[0] || "");
          setExistingImages(post.imageDetails || []);
        }
      } catch (error) {
        notification.error({
          message: "Error fetching post",
          description: error.message,
        });
      }
    };
    if (postId) fetchPost();
  }, [postId]);

  useEffect(() => {
    if (!isModalVisible) {
      setZoomLevel(1);
    }
  }, [isModalVisible]);

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
    setIsModalVisible(true);
  };

  const handleModalImageClick = (e) => {
    const now = Date.now();
    if (now - lastClickTime < 300) {
      if (zoomLevel < 5) {
        setZoomLevel((prev) => prev + 0.1);
      }
      setLastClickTime(0);
    } else {
      setLastClickTime(now);
      const timer = setTimeout(() => {
        if (now === lastClickTime) {
          setIsModalVisible(false);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className={styles.PostDetails}>
      <h1 className={styles.postTitle}>{itemName}</h1>
      <p className={styles.postDescription}>{description}</p>
      <div className={styles.postDetails}>
        <p>
          <strong>Completion Date:</strong> {completionDate}
        </p>
      </div>
      <div className={styles.postImages}>
        {existingImages.map((image, index) => (
          <img
            key={index}
            src={image.imgUrl}
            alt={`Post Image ${index + 1}`}
            className={styles.postImage}
            onClick={() => handleImageClick(image.imgUrl)}
          />
        ))}
      </div>

      <Modal                  //for zooming image
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{ padding: 0, position: "relative" }}
        maskClosable={false}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Zoomed"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "90vh",
              transform: `scale(${zoomLevel})`,
              transition: "transform 0.3s ease-in-out",
              cursor: zoomLevel > 1 ? "zoom-out" : "zoom-in",
              margin: "0 auto",
              display: "block",
            }}
            onClick={handleModalImageClick}
          />
        )}
      </Modal>
    </div>
  );
};

export default PostDetails;
