const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        validate(value){
            if(value.length > 20){
                throw new Error('Name must be shorter than 20 letters');
            }
            if(value.length < 4){
                throw new Error('Name must be at least 4 letters');
            }
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password:{
        type: String,
        required: true,
        validate(value){
            if(value.toLowerCase().match(/password/)){
                throw new Error('Password cannot be password');
            }
            if(value.length < 5){
                throw new Error('Password cannot be shorter than 5 letters');
            }
            if(value.length > 20){
                throw new Error('Password cannot be longer than 20 letters');
            }
        }
    }
})

userSchema.statics.validateLogin = async (email, password)=>{

    const user = await User.findOne({email});

    if(!user){
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.pre('save', async function(next){

    const user = this;

    console.log('Hashing password...')

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    console.log(user.password);

    next();
})

userSchema.post('save', async function(){

    console.log('User saved');
})

const User = new mongoose.model('user', userSchema);

module.exports = User;