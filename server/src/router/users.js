const express = require('express');
const router = new express.Router();
const User = require('../models/user');


router.post('/users/login', async (req, res)=>{
    
    try{
        const user = await User.validateLogin(req.body.email, req.body.password);
        if(!user){
            return res.status(400).send({msg:'Unable to login'});
        }
        return res.send({msg:'Logged in!', user});
    }
    catch(e){
        return res.status(500).send({msg:'Error', e});
    }
})

// create

router.post('/users', async (req, res)=>{
    const data = new User(req.body);

    try{
        await data.save()
        return res.status(201).send({msg:'User created', data})
    }
    catch(e){
        return res.status(400).send({msg:'Error', e})
    }
})

// read
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

// update
router.patch('/users/update/:id', async (req, res)=>{
    const allowed = ['name', 'password', 'email'];
    const update = Object.keys(req.body);
    const isValid = update.every((item)=>{return allowed.includes(item)})

    if(!isValid){
        return res.status(400).send({msg:'Invalid updates'})
    }

    try{
        const user = await User.findById(req.params.id);

        update.forEach((item)=> user[item] = req.body[item]);

        await user.save();

        if(!user){
            return res.status(404).send({msg:'Not found'});
        }
        return res.send({msg:'User update', user});
    }
    catch(e){
        return res.status(500).send({msg:'Error', e});
    }
})

// delete
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