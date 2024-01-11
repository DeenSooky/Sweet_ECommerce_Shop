// components/BlogList.js
import React from 'react';
import BlogPost from './BlogPost';

const BlogList = ({ blogPosts }) => {
  return (
    <div className={styles.container}>
    <h1 className={styles.title}>THE BEST SWEETS IN THE UK</h1>
    <p className={styles.desc}>
    Welcome to Sweet Shop UK, where sweetness meets delight! We are a premier destination for all your sugary cravings and confectionery dreams. Indulge in our delectable assortment of handcrafted chocolates, scrumptious pastries, and irresistible candies.
    With a wide range of flavors and textures, each treat is a little piece of heaven. Our passionate team of confectioners pours love and creativity into every creation, ensuring a delightful experience for every sweet tooth.
    Whether you are celebrating a special occasion, searching for a perfect gift, or simply treating yourself, our Sweet Shop is here to make every moment a little sweeter.
    Visit us today and let the magic of sugar enchant your taste buds!
    </p>
    <div className={styles.wrapper}>
        {blogPosts.map((blog) => (
            <BlogPost key={blog._id} blog={blog} />
        ))}
    </div>
  </div>
  );
};

export default BlogList;