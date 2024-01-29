// Importing necessary dependencies and components
import React from 'react';
import BlogPost from './BlogPost';

// Functional component 'BlogList' to display a list of blog posts
const BlogList = ({ blogPosts }) => {
  return (
    // Main container for the 'BlogList' component
    <div className={styles.container}>
      {/* Title for the blog list */}
      <h1 className={styles.title}>THE BEST SWEETS IN THE UK</h1>
      
      {/* Description introducing the Sweet Shop UK */}
      <p className={styles.desc}>
          Welcome to Sweet Shop UK, where sweetness meets delight! We are a premier destination for all your sugary cravings and confectionery dreams. Indulge in our delectable assortment of handcrafted chocolates, scrumptious pastries, and irresistible candies.
          With a wide range of flavors and textures, each treat is a little piece of heaven. Our passionate team of confectioners pours love and creativity into every creation, ensuring a delightful experience for every sweet tooth.
          Whether you are celebrating a special occasion, searching for a perfect gift, or simply treating yourself, our Sweet Shop is here to make every moment a little sweeter.
          Visit us today and let the magic of sugar enchant your taste buds!
      </p>

      {/* Wrapper for displaying individual 'BlogPost' components */}
      <div className={styles.wrapper}>
          {/* Mapping through the list of blog posts and rendering 'BlogPost' components */}
          {blogPosts.map((blog) => (
              <BlogPost key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

// Exporting the 'BlogList' component
export default BlogList;
