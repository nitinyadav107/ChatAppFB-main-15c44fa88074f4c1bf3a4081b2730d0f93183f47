import mongoose from "mongoose"
const UserSchema = mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {

        type: String,

    },
    image: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verficationToken: String,
    verficationTokenExpiresAt: Date,
    
}, { timestamps: true }) //created at updated at
const User = mongoose.model("User", UserSchema);
export default User;
