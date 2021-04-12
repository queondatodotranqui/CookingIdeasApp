const mongoose = require('mongoose');

const Idea = new mongoose.model('idea', 
    {
        description:{
            type:String,
            required: true,
            validate(value){
                if(value.length > 30){
                    throw new Error('Description too long');
                }
                if(value.length < 5){
                    throw new Error('Description too short');
                }
            }
        },
        type:{
            type:String,
            required: true,
            validate(value){
                const allowedTypes = ['Almuerzo', 'Cena'];
                const isValid = allowedTypes.includes(value);
                if(!isValid){
                    throw new Error('Invalid type');
                }
            }
        }
    }
)

module.exports = Idea;