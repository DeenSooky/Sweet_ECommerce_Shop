// Importing Mongoose library for defining schema
import mongoose from "mongoose";

// Creating a new Mongoose schema for products
const ProductSchema = new mongoose.Schema({
    // Product title
    title: {
        type:String,
        required:true,
        maxlength: 60,
    },

    // Short description of the product
    desc: {
        type:String,
        required:true,
        maxlength: 200,
    },

    // Long description of the product
    longdesc: {
        type:String,
        required:true,
        maxlength: 10000,
    },

    // Image URL for the product
    img: {
        type:String,
        required:true,
    },

    // Prices for different sizes of the product
    prices: {
        type: [Number],
        required: true,
    },

    // Additional options for the product (e.g., toppings)
    options: {
        type: [
            {
                text:{type:String, required:true}, 
                price:{type:Number, required:true},
            },
        ],
    },
},
// Additional configuration with timestamps for createdAt and updatedAt
{timestamps: true}
);

// Exporting the Mongoose model for products
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
