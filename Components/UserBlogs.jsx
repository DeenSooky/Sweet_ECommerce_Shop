import styles from "../styles/UserBlogs.module.css"

const blogPosts = ({handleEdit, handleDelete,  userBlogPosts, onCancel, timeFormat}) => {


  return (
    <div className={styles.container}>
      <span className={styles.cancel} onClick={onCancel}>X</span>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Your blogs</h1>
          {userBlogPosts && userBlogPosts.length > 0 ? (userBlogPosts.map((blog) => (
            <li className={styles.userInfo} key={blog._id}>
              <p className={styles.item}><u>Author</u><br/> {blog.author}</p>
              <p className={styles.item}><u>Ttitle </u><br/> {blog.title}</p>
              <p className={styles.item}><u>Date Posted</u><br/>{timeFormat(blog.createdAt)}</p>
              <div className={styles.buttons}>
                <button className={styles.btn}  onClick={() => handleEdit(blog._id)} >Edit </button>
                <button className={styles.btn} onClick={() => handleDelete(blog._id)}>Delete </button>
              </div>
            </li>
          ))
          ) : (
            <div>
            <p>yo</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default blogPosts 
