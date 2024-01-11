import mongoose from "mongoose";


const UserSchema = new mongoose.Schema ({

    username: {
        type:String,
        required:true,
        maxlength: 60,
    },
    password: {
        type:String,
        required:true,
        maxlength: 200,
    },
    
    orders: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Order',
        required: false, 
    }],

    blogs: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost',
        required: false
    }]


},
{timestamps: true}
);
// Create an index on the username field
UserSchema.index({ username: 1 }, { unique: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);