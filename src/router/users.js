const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res)=>{
    const data = new User(req.body);

    try{
        const user = await data.save()
        return res.status(201).send({msg:'User created', user})
    }
    catch(e){
        return res.status(400).send({msg:'Error', e})
    }
})

router.get('/users', async (req, res)=>{
    try{
        const data = await User.find({});
        if(data.length === 0){
            return res.status(404).send({msg:'Not found'});
        }
        return res.send({msg:'Success', data});
    }
    catch(e){
        return res.status(500).send({msg:'Error', e})
    }
})

router.get('/users/id/:id', async (req, res)=>{
    
    try{
        const data = await User.findById(req.params.id);
        if(data === null){
            return res.status(404).send({msg:'Not found'});
        }
        return res.send({msg:'Success', data});
    }
    catch(e){
        return res.status(400).send({msg:'Error', e});
    }
})

router.get('/users/name/:name', async (req, res)=>{
    const name = req.params.name;

    try{
        const data = await User.findOne({name})
        if(!data){
            return res.status(404).send({msg:'Not found'});
        }
        return res.send({msg:'Success', data});
    }
    catch(e){
        return res.status(400).send({msg:'Error', e});
    }
})

router.patch('/users/update/:id', async (req, res)=>{
    const allowed = ['name', 'password', 'email'];
    const update = Object.keys(req.body);
    const isValid = update.every((item)=>{return allowed.includes(item)})

    if(!isValid){
        return res.status(400).send({msg:'Invalid updates'})
    }

    try{
        const data = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(data === null){
            return res.status(404).send({msg:'Not found'});
        }
        return res.send({msg:'Success', data});
    }
    catch(e){
        return res.status(500).send({msg:'Error', e});
    }
})

router.delete('/users/delete/:id', async (req, res)=>{

    try{
        const data = await User.findByIdAndDelete(req.params.id)
        if(data === null){
            return res.status(404).send({msg:'Not found'});
        }
        return res.send({msg:'User deleted', data});
    }
    catch(e){
        return res.status(500).send({msg:'Error', e});
    }
})

module.exports = router;