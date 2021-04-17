const express = require('express');
require('./db/db');
const userRouter = require('./router/users');
const ideasRouter = require('./router/ideas');

const app = express();
const port = process.env.PORT || 3001;

const text;

app.use(express.json());
app.use(userRouter);
app.use(ideasRouter);

app.listen(port, ()=>{
    console.log(`Server up in port ${port}`);
})