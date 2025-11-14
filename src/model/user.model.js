// once who upload the media 

import mongoose,{Schema} from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    
    uploadedMedia:[{
       type:String,     // from cloudinary 
       required:true
    }]
}, {
    timestamps:true
})

// hashing password 
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// compare password method 
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model('User', userSchema);