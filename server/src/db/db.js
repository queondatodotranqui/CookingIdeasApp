const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/cooking-ideas', {useCreateIndex:true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})