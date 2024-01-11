import mongoose from "mongoose";


const   OrderSchema = new mongoose.Schema ({

    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: false 
    },

    customer: {
        type:String,
        required:true,
        maxlength: 60,
    },
    address: {
        type:String,
        required:true,
        maxlength: 200,
    },
    total: {
        type:Number,
        required:true,
    },
    status: {
        type: Number,
        default: 0,
    },
    method: {
        type: Number,
        required: true,
    },
    },
    {timestamps: true}
);
// Create an index on the user field
OrderSchema.index({ user: 1 });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)