"use strict";
//import {express} from 'express';
const express = require('express');
let app = express();
app.get('/error', (_req, _res) => {
    throw new Error("ERROR");
});
app.use((err, _req, res, _next) => {
    res.status(500).send({ error: err.message });
});
app.listen(3000);
//{
//    "error": "ERROR"
//}
//# sourceMappingURL=Question_6.js.map