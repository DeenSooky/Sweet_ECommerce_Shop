// Importing Mongoose library for defining schema
import mongoose from "mongoose";

// Creating a new Mongoose schema for users
const UserSchema = new mongoose.Schema({
    // Unique username for the user
    username: {
        type:String,
        required:true,
        maxlength: 60,
    },

    // Hashed password for user authentication
    password: {
        type:String,
        required:true,
        maxlength: 200,
    },
    
    // Reference to orders associated with the user
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: false, 
    }],

    // Reference to blog posts created by the user
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost',
        required: false
    }],
},
// Additional configuration with timestamps for createdAt and updatedAt
{timestamps: true}
);

// Creating an index on the username field with unique constraint
UserSchema.index({ username: 1 }, { unique: true });

// Exporting the Mongoose model for users
export default mongoose.models.User || mongoose.model("User", UserSchema);
