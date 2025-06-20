"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
async function readAFile(a) {
    try {
        let res = await (0, promises_1.readFile)(a, 'utf-8');
        console.log(res);
    }
    catch (err) {
        console.log(err.message);
    }
}
readAFile('4_Node_js_questions/abstract.txt');
//When doesn't exist:
//C:\Program Files\nodejs\node.exe .\dist\4_Node_js_questions\Question4.js
//ENOENT: no such file or directory, open 'C:\Users\danbe\Ravtech-GettingStarttoNice\abstract.txt'
//C:\Program Files\nodejs\node.exe .\dist\4_Node_js_questions\Question4.js
//Some text
//# sourceMappingURL=Question4.js.map