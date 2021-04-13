const express = require('express');
const router = new express.Router();
const Idea = require('../models/ideas');

// create
router.post('/ideas', async (req, res)=>{

    const data = new Idea(req.body);

    try{
        const idea = await data.save();
        return res.status(201).send({msg:'Idea posted', idea});
    }
    catch(e){
        return res.status(400).send({msg:'Error', e});
    }
})

// read
router.get('/ideas', async (req, res)=>{
    
    try{
        const data = await Idea.find({});
        if(data.length === 0){
            return res.status(404).send({msg:'Not found'});
        }
        return res.send({msg:'Success', data});
    }
    catch(e){
        return res.status(500).send({msg:'Error', e});
    }
})

router.get('/ideas/type/:type', async (req, res)=>{

    try{
        const idea = await Idea.find({type:req.params.type});
        if(idea.length === 0){
            return res.status(404).send({msg:'Not found'});
        }
        return res.send({msg:'Success', idea});
    }
    catch(e){
        return res.status(500).send({msg:'Error', e});
    }
})

// update
router.patch('/ideas/update/:id', async (req, res)=>{

    const allowUpdate = ['description', 'type'];
    const update = Object.keys(req.body);
    const isValid = update.every((item)=>{return allowUpdate.includes(item)});

    if(!isValid){
        return res.status(400).send({msg:'Invalid updates'});
    }

    try{
        const data = await Idea.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(data === null){
            return res.status(404).send({msg:'Not found'});
        }
        return res.send({msg:'Idea updated', data});
    }
    catch(e){
        return res.status(500).send({msg:'Error', e});
    }
})

// delete
router.delete('/ideas/delete/:id', async (req, res)=>{

    try{
        const data = await Idea.findByIdAndDelete(req.params.id);
        if(data === null){
            return res.status(404).send({msg:'Not found'});
        }
        return res.send({msg:'Idea deleted', data})
    }
    catch(e){
        return res.status(500).send({msg:'Error', e});
    }
})



module.exports = router;