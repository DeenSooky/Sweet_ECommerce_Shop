// Importing necessary dependencies and styles
import React, { useEffect, useState } from 'react';
import styles from "../styles/AddBlog.module.css";

// Functional component 'EditBlog' for editing an existing blog
const EditBlog = ({ editingBlog, onSave, onCancel }) => {
    // State to manage the edited blog details
    const [editedBlog, setEditedBlog] = useState({
      productName: '',
      title: '',
      content: '',
      author: '',
    });

    // useEffect to initialize the state with the values of the editingBlog
    useEffect(() => {
        setEditedBlog({
          productName: editingBlog.productName,
          title: editingBlog.title,
          content: editingBlog.content,
          author: editingBlog.author,
        });
    }, [editingBlog]);

    // Rendering the component with input fields and buttons for editing
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
              {/* Close button to cancel the editing */}
              <span onClick={onCancel} className={styles.close}>
                  X
              </span>
              <h1>Edit an existing blog</h1>

              {/* Input field for the full name of the product the blog refers to */}
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

              {/* Input field for the title of the blog */}
              <div className={styles.item}>
                <label className={styles.label}>Title:</label>
                <input
                    className={styles.input}
                    type="text"
                    value={editedBlog.title}
                    onChange={(e) => setEditedBlog({ ...editedBlog, title: e.target.value })}
                />
              </div>

              {/* Textarea for the content of the blog */}
              <div className={styles.item}>
                <label className={styles.label}>Blog content:</label>
                <textarea
                    rows={20}
                    type="text"
                    value={editedBlog.content}
                    onChange={(e) => setEditedBlog({ ...editedBlog, content: e.target.value })}
                />
              </div>

              {/* Input field for the author of the blog */}
              <div className={styles.item}>
                  <label className={styles.label}>Author:</label>
                  <input
                      className={styles.input}
                      type="text"
                      value={editedBlog.author}
                      onChange={(e) => setEditedBlog({ ...editedBlog, author: e.target.value })}
                  />
              </div>

              {/* Button to save the edited blog */}
              <button
                  className={styles.addButton}
                  style={{
                    backgroundColor: '#ec08ccba',
                    width: '15%',
                    left: '330px',
                    bottom: '30px',
                  }}
                  onClick={() => onSave({ ...editedBlog, _id: editingBlog._id })}
              >
                  Save
              </button>
            </div>
        </div>
    );
};

// Exporting the 'EditBlog' component
export default EditBlog;
