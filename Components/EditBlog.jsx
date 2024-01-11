// EditBlog.js
import React, { useEffect, useState } from 'react';
import styles from "../styles/AddBlog.module.css";

const EditBlog = ({ editingBlog, onSave, onCancel, ShowEditBlogForm}) => {

    const [editedBlog, setEditedBlog] = useState({
        productName: '',
        title: '',
        content: '',
        author: '',
    });


    useEffect(() => {
        // Initialize the editingBlog state with the values of the editingBlog
        setEditedBlog({
          productName: editingBlog.productName,
          title: editingBlog.title,
          content: editingBlog.content,
          author: editingBlog.author,
        });
    }, [ShowEditBlogForm]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={onCancel} className={styles.close}>
          X
        </span>
        <h1>Edit an existing blog</h1>
        <div className={styles.item}>
          <label className={styles.label}>
            Please enter the full name of the product your blog refers to:
          </label>
          <input
            className={styles.input}
            type="text"
            value={editedBlog.productName}
            onChange={(e) => setEditedBlog({ ...editedBlog, productName: e.target.value })}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Title:</label>
          <input
            className={styles.input}
            type="text"
            value={editedBlog.title}
            onChange={(e) => setEditedBlog({ ...editedBlog, title: e.target.value })}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Blog content:</label>
          <textarea
            rows={20}
            type="text"
            value={editedBlog.content}
            onChange={(e) => setEditedBlog({ ...editedBlog, content: e.target.value })}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Author:</label>
          <input
            className={styles.input}
            type="text"
            value={editedBlog.author}
            onChange={(e) => setEditedBlog({ ...editedBlog, author: e.target.value })}
          />
        </div>

        <button
          className={styles.addButton}
          style={{
            backgroundColor: '#ec08ccba',
            width: '15%',
            left: '330px',
            bottom: '30px',
          }}
          onClick={() => onSave({...editedBlog, _id: editingBlog._id})}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBlog;
