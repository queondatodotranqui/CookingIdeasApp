const mongoose = require('mongoose');

const Idea = new mongoose.model('idea', 
    {
        description:{
            type:String,
            required: true,
            validate(value){
                if(value.length > 30){
                    throw new Error('Descripcion muy larga');
                }
                if(value.length < 5){
                    throw new Error('Descripcion muy corta');
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
                    throw new Error('Categoria invalida');
                }
            }
        }
    }
)

module.exports = Idea;