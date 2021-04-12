const mongoose = require('mongoose');
const validator = require('validator');

const User = new mongoose.model('user',
    {
        name:{
            type: String,
            required: true,
            validate(value){
                if(value.length > 20){
                    throw new Error('El nombre es muy largo');
                }
                if(value.length < 4){
                    throw new Error('El nombre es muy corto');
                }
            }
        },
        email:{
            type: String,
            required: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('El email es invalido');
                }
            }
        },
        password:{
            type: String,
            required: true,
            validate(value){
                if(value.toLowerCase().match(/password/)){
                    throw new Error('La clave no puede ser password');
                }
                if(value.length < 5){
                    throw new Error('La clave no puede ser menor a 5 letras');
                }
                if(value.length > 20){
                    throw new Error('La clave no puede ser mayor a 20');
                }
            }
        }
    }
)

module.exports = User;