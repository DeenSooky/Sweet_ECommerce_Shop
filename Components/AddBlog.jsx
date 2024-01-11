import React from "react";
import styles from "../styles/AddBlog.module.css";
import axios from "axios";
import { useState } from "react";

const AddBlog = ({handleCreate, onCancel }) => {

  const [addedblog, setAddedBlog] = useState({
      productName: "",
      title: "",
      content: "",
      author: "",
    }
  )

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={onCancel} className={styles.close}>
          X
        </span>
        <h1>Add a new blog</h1>

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

        <div className={styles.item}>
          <label className={styles.label}>Title:</label>
          <input
            className={styles.input}
            type="text"
            value={addedblog.title}
            onChange={(e) => setAddedBlog({ ...addedblog, title: e.target.value })}
          />
        </div>

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

      <button className={styles.addButton} onClick={() => handleCreate(addedblog)}>
        Create blog
      </button>
    </div>
  );
};

export default AddBlog;
