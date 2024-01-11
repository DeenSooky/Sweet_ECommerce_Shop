// pages/blog/index.jssetblogDisplay
import styles from "../../styles/index.module.css"
import axios from 'axios';
import Image from "next/image";
import BlogPostPage from './[id]';
import { useState} from 'react';
import AddBlog from '../../Components/AddBlog';
import Cookies from 'js-cookie';
import UserBlogs from '../../Components/UserBlogs';
import EditBlog from "../../Components/EditBlog";


const BlogPage = ({initialBlogPosts, sweetList, allBlogPostIds, initialBlogs}) => {

  // Retrieves token from browser
  const token = Cookies.get('token')

  // state mangement 

  const[blogIds, setBlogIds] = useState(allBlogPostIds)

  //Edit Blog component state mangement
  const[editingBlog, setEditingBlog] = useState(null) // state for user blog being edited 
  const [ShowEditBlogForm, setShowEditBlogForm ] = useState(false) // state condtion for EditBlog form rendering
  // New state for initialBlogs
  const [updatedInitialBlogs, setUpdatedInitialBlogs] = useState(initialBlogs);
  
  //BlogPostPage component 
  const [showEditForm, setShowEditForm] = useState(false) // state condtion for BlogPostPage form rendering
  const [currentIndex, setCurrentIndex] = useState(null); // state condition for index used in carrosel functionality
  //UserBlogs component
  const [showUserBlogs, setShowUserBlogs] = useState(false) // state condtion for UserBlogs form rendering)
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts); // state condition to render all blogs in database
  const [ userBlogPosts, setUserBlogPosts] = useState(initialBlogs) // state condition to render all of a users blogs
  //AddBlog component
  const [showEditForm2, setShowEditForm2] = useState(false) //state condtion for AddBlog form rendering
  const [err, setErr] = useState('') //state condtion for error mewssage rendering
  //state condtion to reset addblog field
  const [addblog, setAddBlog] = useState({
    productName: "",
    title: "",
    content: "",
    author: "",
    ...blogPosts, // Spread the blog prop to override the default values if available
  });
  // Search bar input
  const [SearchQuery, setSearchQuery] = useState("") // state for search input 
  const [searchSuccessful, setSearchSuccessful] = useState(true) // state to see if search worked 
  const [seeAll, setSeeAll] = useState(false) // stae condition for See all button rendering 

  // Post date formatting function
  
  const timeFormat = (createdAt) => {
  
    // Ensure createdAt is a Date object
    const datetimeObject = new Date(createdAt);

    const formattedOutput =
      datetimeObject.toISOString().split('T')[0] +
      ' at ' +
      ('0' + datetimeObject.getHours()).slice(-2) +
      ':' +
      ('0' + datetimeObject.getMinutes()).slice(-2);
    return formattedOutput;
  };

  // Edit button function

  const handleEdit = (id) => {

    const blogToEdit = updatedInitialBlogs.find((blog) => blog._id === id);

    setEditingBlog(blogToEdit);

    setShowUserBlogs(false)
    setShowEditBlogForm(true)
  };
  
  // image display function for displaying pictures in blogs
  const imageDisplay = (sweetList, productName) => {
    const inputString = productName;
  
    // Find the first product with a matching title
    const matchingProduct = sweetList.find((sweet) => sweet.title === inputString);
  
    // Return the image of the matching product, or a default image if no match is found
    return matchingProduct ? matchingProduct.img : '/img/sweet_shop_logo2.png';
  };

  // blog content teaser function
  const contentSlice = (content) => {
    return content.slice(0,400)
  }

  // Read more button function
  const ReadMore = async (id) => { 
    setBlogIds([...allBlogPostIds, id])
    const indexToShow = blogIds.indexOf(id); //find index of blog selected 
    setShowEditForm(true);
    setCurrentIndex(indexToShow);
  };

  // Add blog function 
  const handleAdd = () => {

    if (token){
      setAddBlog({
        productName: '',  
        title: '',
        content: '',
        author: ''
      });
      setShowEditForm2(true);
    }else{
      setErr('Please sign in or register to add a blog')
      setTimeout(() => {
        setErr('')
      }, 3000);
    }
  };

  const handleCreate = async (newBlog) => {

    newBlog.createdAt = new Date()
    console.log("Data: ", newBlog);

    try {
      await axios.post("http://localhost:3000/api/blogs", newBlog, {withCredentials: true});
      setBlogPosts([...blogPosts, newBlog])
      cancelEdit();
    } catch (err) {
      console.log(err);
    }
  };
  
  // close form function 
  const cancelEdit = () => {
    if (showEditForm2){
      setShowEditForm2(false); 
    }else if (ShowEditBlogForm){
      setShowEditBlogForm(false)
      setShowUserBlogs(true)
    }else if (showUserBlogs){
      setShowUserBlogs(false)
    }
    else if (showEditForm) {
      setShowEditForm(false)
    }
  };

  // Manage blog button function
  const manageBlog = () => {
    setShowUserBlogs(true)
  }


  // Search button function
  const handleSearch = () => {
      
    const query = SearchQuery.toLowerCase().trim() // clean query searched

    if (query === '') {
        setSearchSuccessful(false);
        setTimeout(() => {
          setSearchSuccessful(true)
        }, 500);
    } 
    else {
      const filteredBlogs = blogPosts.filter(            // filter blogs in database by title or author
          (post) =>
            post.title.toLowerCase().includes(query) ||
            post.author.toLowerCase().includes(query)
      );

      if (filteredBlogs.length < 1) {
          setSearchSuccessful(false);
          setTimeout(() => {
            setSearchSuccessful(true)
          }, 500);
      } else {
          setBlogPosts(filteredBlogs);   // display blogs off search input
          setSeeAll(true);
      }
    }
  };

  // Delete button function

  const handleDelete = async (id) => {
    try {
      // Send a delete request to the server with the blog ID
      const res = await axios.delete(`http://localhost:3000/api/blogs/${id}`);
      
      // Check if the delete was successful on the server
      if (res.status === 201) {
        // If the delete is successful, update the blog list by filtering out the deleted blog
        setBlogPosts(blogPosts.filter(blog => blog._id !== id));
        setUserBlogPosts(userBlogPosts.filter(blog => blog._id !== id));
        setUpdatedInitialBlogs(updatedInitialBlogs.filter(blog => blog._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  // Save button function

  const handleSaveBlog = async (updatedBlog) => {

    updatedBlog.createdAt = editingBlog.createdAt

    // Send an update request to the server with the updated product
    const res = await axios.put(
      `http://localhost:3000/api/blogs/${updatedBlog._id}`,
      updatedBlog
    );
    
    // Check if the update was successful on the server
    if (res.status === 201) {
      // If the update is successful, update the product list with the updated product

      const updatedBlogs = blogPosts.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      );

      const updatedUserBlogs = userBlogPosts.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      );

      setBlogPosts(updatedBlogs);
      setUserBlogPosts(updatedUserBlogs)

      // Update initialBlogs state
      setUpdatedInitialBlogs(updatedBlogs);

      setShowEditBlogForm(false); 
      setShowUserBlogs(true)
    }
  };

  // shake animation upon unsuccessul search conditions
  const shakeAnimationClass =  searchSuccessful ? '' : styles.shake //success = nothing, unsuccess = shake
  // button style of add button for user with and without token
  const buttonStyle = token ? styles.addButton: styles.addButtonNoToken

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Sweet Stories</h1> 

      <div className={styles.buttons}> {/* Add blog and mange blogs button plus condtional rendering */}
        <button className={buttonStyle} onClick={() =>handleAdd(blogPosts._id)}><b>Add New Blog</b></button>
        {token && <button className={styles.ManageButton} onClick={() => manageBlog()}>Manage your blogs</button>}
        {showEditForm2 && ( <AddBlog handleCreate={handleCreate} onCancel={() => cancelEdit()}/>)}
        {showUserBlogs && (<UserBlogs handleEdit={handleEdit} handleDelete={handleDelete} userBlogPosts={userBlogPosts} timeFormat ={timeFormat} onCancel= {() => cancelEdit()}/>)}
      </div>

      <p className={styles.errorMessage}> {/* Error message condtional rendering*/}
        {err && (<span className={styles.err}>{err}</span>)}
      </p>

      {ShowEditBlogForm  &&  (<EditBlog editingBlog={editingBlog} ShowEditBlogForm={ShowEditBlogForm}  onSave={(updatedBlog) => handleSaveBlog(updatedBlog)} onCancel={cancelEdit} />)} {/*EditBlog component conditonal rendering*/}

      <div className={`${styles.searchContainer} ${shakeAnimationClass}`}> {/* Search Bar and see all button components */}
        <input 
            className={styles.searchBar} 
            type='text' 
            placeholder='Search by author or title... '
            value={SearchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        <Image className={styles.magGlass} src="/img/magGlass.png" onClick={handleSearch} width={35} height={35}/>
    
        {seeAll && 
          <button
            className={styles.seeAll}
            onClick={() => {
                setSeeAll(false);
                setBlogPosts(initialBlogPosts);
                setSearchQuery(''); 
            }}
          >
          <b>See All</b>
          </button>
        }
      </div>
      
      <p className={styles.desc}>
        Welcome to Sweets4Every1, your delectable haven for all things sweet! Our blog is a delightful space where our cherished customers take the spotlight, sharing their sweet experiences and culinary adventures. 
        From mouthwatering recipes to heartwarming stories about the joy of sharing sweets with loved ones, our blog is a testament to the sweet moments that make life truly special. 
        Join our community of sweet enthusiasts as they explore the world of confectionery, offering a taste of their favorite treats and the stories that accompany them.
        Whether you're a seasoned pastry chef or simply have a sweet tooth, Sweets4Every1 is your virtual confectionery haven. Get ready to indulge in the enchanting world of sweets, one delightful blog post at a time!
      </p>

      <div className={styles.wrapper}>

        {blogPosts && blogPosts.length > 0  && (
            blogPosts.map((post) => (
              <div className={styles.card} key={post._id}>
                  <Image  className={styles.img} src={imageDisplay(sweetList, post.productName)} alt = "Blog Image" width={446} height={250}/>
                  <h1 className={styles.title2}>{post.title}</h1> 
                  <p className={styles.content}>{contentSlice(post.content)}...</p>
                  <button className={styles.button} onClick={() =>ReadMore(post._id)}>Read more</button>
                  <p className={styles.post}>Posted by {post.author}, {timeFormat(post.createdAt)} </p>
                </div>
            ))
        )}

        {showEditForm && (          //Blog carrosel conditional rendering 
          <BlogPostPage
            blogPosts={blogPosts}
            onCancel={cancelEdit}
            index={currentIndex}
          />
        )}
      </div>
      
      

    </div>
  );
};


export const getServerSideProps = async (ctx) => {
  
  try {
    const res = await axios.get("http://localhost:3000/api/blogs");
    const res2 = await axios.get("http://localhost:3000/api/products");

    const blogPosts = res.data
    const allBlogPostIds = blogPosts.map((post) => post._id);

    const res3 = await axios.get("http://localhost:3000/api/blogs/[id]", {
      headers: {
        Cookie: `${ctx.req.headers.cookie || ""}; Secure`
      },
    });

    return {
      props: {
        initialBlogPosts: res.data,  //All blogs in database
        sweetList: res2.data,        //Product info for image display
        allBlogPostIds,              // all blog post id's
        initialBlogs: res3.data.initialBlogs,  //blogs for a specific user
      },
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      props: {
        blogPosts: [],
        allBlogPostIds: [],
      },
    };
  }
};



export default BlogPage;
