const express = require('express');
const router = new express.Router();

router.get('/ideas', (req, res)=>{
    res.send({msg:'Message from ideas router'});
})

module.exports = router;