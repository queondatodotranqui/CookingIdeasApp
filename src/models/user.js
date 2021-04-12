const mongoose = require('mongoose');
const validator = require('validator');

const User = new mongoose.model('user',
    {
        name:{
            type: String,
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
    }
)

module.exports = User;