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



module.exports = router;