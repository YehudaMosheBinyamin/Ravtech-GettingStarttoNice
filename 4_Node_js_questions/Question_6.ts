//import {express} from 'express';
const express = require('express');
let app=express();
app.get('/error',(_req:any,_res:any)=>{
    throw new Error("ERROR");
});
app.use((err:any,_req:any,res:any,_next:any)=>{
    res.status(500).send({ error: err.message });
})
app.listen(3000);

//{
//    "error": "ERROR"
//}