"use client"
import { useEffect, useState } from "react"
import { notification } from "antd"
import StorageService from "../../util/StorageService"
import axios from "axios"
import styles from "./CategorySelector.module.css" // Import the CSS Module

const CategorySelector = (props) => {
  const { selectedCategories, setSelectedCategories, onClose, open } = props

  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState("") // Add search query state

  // Function to create Authorization header
  const createAuthorizationHeader = () => {
    const token = StorageService.getToken()
    console.log("Retrieved Token:", token)
    return { Authorization: `Bearer ${token}` } // Fixed token format
  }

  useEffect(() => {
    console.log("Updated selected categories:", selectedCategories)
  }, [selectedCategories])

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories/category", {
        headers: createAuthorizationHeader(),
      })
      setCategories(response.data)
    } catch (error) {
      notification.error({
        message: "Error fetching categories",
        description: error.message || "Something went wrong",
      })
    }
  }

  useEffect(() => {
    if (open) {
      fetchCategories()
    }
  }, [open])

  // Handle category selection (Add/remove entire category object)
  const handleSelectCategory = (category) => {
    if (selectedCategories.some((cat) => cat.id === category.id)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat.id !== category.id))
    } else {
      setSelectedCategories([...selectedCategories, category]) // Add the whole category object
    }
    console.log("Selected Categories:", selectedCategories)
  }

  // Delete selected category
  const handleDeleteCategory = (categoryId) => {
    setSelectedCategories(selectedCategories.filter((category) => category.id !== categoryId))
  }

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderDialog = () => (
    <div className={styles.dialog}>
      <div className={styles.dialogContent}>
        <h3>Select Categories</h3>
        <button className={styles.button} onClick={onClose} type="button">
          Close
        </button>

        {/* Add search input */}
        <input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />

        {/* Wrap categories in a scrollable container */}
        <div className={styles.categoriesContainer}>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category.id}>
                <span>
                  <label className={styles.categoryName}>{category.name}</label>
                  <input
                    className={styles.categoryCheckBox}
                    type="checkbox"
                    checked={selectedCategories.some((cat) => cat.id === category.id)}
                    onChange={() => handleSelectCategory(category)}
                  />
                </span>
                <p>{category.description}</p>
              </div>
            ))
          ) : (
            <p>No categories found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  )

  return (
   
    <div className={styles.categorySelector}>
      <div className={styles.selectedCategories}>
        {selectedCategories.map((category) => (
          <span key={category.id} className={styles.categoryTag}>
            {category.name}
            <button className={styles.deleteButton} onClick={() => handleDeleteCategory(category.id)}>
              ✖
            </button>
          </span>
        ))}
      </div>

      {open && renderDialog()}
    </div>

  )
}

export default CategorySelector

