const express = require('express');
const router = new express.Router();

router.get('/user', (req, res)=>{
    res.send({msg:'Message from user router'});
})

module.exports = router;