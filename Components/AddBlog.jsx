// Importing necessary dependencies and styles
import React from "react";
import styles from "../styles/AddBlog.module.css";
import { useState } from "react";

// Functional component 'AddBlog' with destructuring props
const AddBlog = ({handleCreate, onCancel }) => {

  // State to manage the form data for a new blog
  const [addedblog, setAddedBlog] = useState({
      productName: "",
      title: "",
      content: "",
      author: "",
    }
  )

  return (
    // Main container for the 'AddBlog' component
    <div className={styles.container}>
      <div className={styles.wrapper}>

        {/* Close button to cancel adding a new blog */}
        <span onClick={onCancel} className={styles.close}>
          X
        </span>

        {/* Heading for the 'AddBlog' form */}
        <h1>Add a new blog</h1>

        {/* Input for the product name of the blog */}
        <div className={styles.item}>
          <label className={styles.label}>
            Please enter the full name of the product your blog refers to:
          </label>
          <input
            className={styles.input}
            type="text"
            value={addedblog.productName}
            onChange={(e) =>
              setAddedBlog({ ...addedblog, productName: e.target.value })
            }
          />
        </div>

        {/* Input for the title of the blog */}
        <div className={styles.item}>
          <label className={styles.label}>Title:</label>
          <input
            className={styles.input}
            type="text"
            value={addedblog.title}
            onChange={(e) => setAddedBlog({ ...addedblog, title: e.target.value })}
          />
        </div>

        {/* Textarea for the content of the blog */}
        <div className={styles.item}>
          <label className={styles.label}>Blog content:</label>
          <textarea
            rows={20}
            type="text"
            value={addedblog.content}
            onChange={(e) =>
              setAddedBlog({ ...addedblog, content: e.target.value })
            }
          />
        </div>

        {/* Input for the author of the blog */}
        <div className={styles.item}>
          <label className={styles.label}>Author:</label>
          <input
            className={styles.input}
            type="text"
            value={addedblog.author}
            onChange={(e) => setAddedBlog({ ...addedblog, author: e.target.value })}
          />
        </div>
      </div>

      {/* Button to trigger the 'handleCreate' function */}
      <button className={styles.addButton} onClick={() => handleCreate(addedblog)}>
        Create blog
      </button>
    </div>
  );
};

// Exporting the 'AddBlog' component
export default AddBlog;
