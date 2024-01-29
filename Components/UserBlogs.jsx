// Importing styles for the component
import styles from "../styles/UserBlogs.module.css";

// Functional component 'blogPosts'
const blogPosts = ({ handleEdit, handleDelete, userBlogPosts, onCancel, timeFormat }) => {
  return (
    <div className={styles.container}>
      {/* Close button for cancelling */}
      <span className={styles.cancel} onClick={onCancel}>X</span>
      {/* Wrapper for displaying user's blog posts */}
      <div className={styles.wrapper}>
        {/* Heading for the user's blogs */}
        <h1 className={styles.title}>Your blogs</h1>
        {/* Checking if there are user's blog posts */}
        {userBlogPosts && userBlogPosts.length > 0 ? (
          // Mapping through user's blog posts and rendering information for each blog
          userBlogPosts.map((blog) => (
            <li className={styles.userInfo} key={blog._id}>
              {/* Displaying author information */}
              <p className={styles.item}><u>Author</u><br/> {blog.author}</p>
              {/* Displaying blog title information */}
              <p className={styles.item}><u>Title</u><br/> {blog.title}</p>
              {/* Displaying date posted information */}
              <p className={styles.item}><u>Date Posted</u><br/>{timeFormat(blog.createdAt)}</p>
              {/* Buttons for editing and deleting the blog */}
              <div className={styles.buttons}>
                <button className={styles.btn} onClick={() => handleEdit(blog._id)}>Edit</button>
                <button className={styles.btn} onClick={() => handleDelete(blog._id)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          // Displaying a message if there are no user's blog posts
          <div>
            <p>No blogs available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Exporting the 'blogPosts' component
export default blogPosts;
