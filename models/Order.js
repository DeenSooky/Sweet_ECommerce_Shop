// Importing Mongoose library for defining schema
import mongoose from "mongoose";

// Creating a new Mongoose schema for orders
const OrderSchema = new mongoose.Schema({
    // User reference (if applicable)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false 
    },

    // Customer's name
    customer: {
        type:String,
        required:true,
        maxlength: 60,
    },

    // Customer's address
    address: {
        type:String,
        required:true,
        maxlength: 200,
    },

    // Total order amount
    total: {
        type:Number,
        required:true,
    },

    // Order status (default is 0)
    status: {
        type: Number,
        default: 0,
    },

    // Payment method
    method: {
        type: Number,
        required: true,
    },
},
// Additional configuration with timestamps for createdAt and updatedAt
{timestamps: true}
);

// Create an index on the user field
OrderSchema.index({ user: 1 });

// Export
export default mongoose.models.Order || mongoose.model("Order", OrderSchema)