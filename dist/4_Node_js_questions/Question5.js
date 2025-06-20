"use strict";
//Possible correction:
//Note: I didn't chain the functions at the calls since it seem
//like getUserName is meant to receive a string and parseJSON returns an object.
Object.defineProperty(exports, "__esModule", { value: true });
function parseJSON(str) {
    return new Promise((resolve, reject) => {
        try {
            let s = JSON.parse(str);
            resolve(s);
        }
        catch (err) {
            reject(err);
        }
    });
}
async function getUserName(jsonStr) {
    let promiseResult = await parseJSON(jsonStr);
    if ('name' in promiseResult) {
        return promiseResult.name;
    }
}
//For parseJSON('<E4')
//C:\Program Files\nodejs\node.exe .\dist\4_Node_js_questions\Question5.js
//Unexpected token '<', "<E4" is not valid JSON
//parseJSON('<E4').then((res)=>{console.log(JSON.stringify(res))}).catch((err)=>{console.log(err.message)});
///parseJSON('{"4":"4"}').then((res)=>{console.log(JSON.stringify(res))}).catch((err)=>{console.log(err.message)});
//C:\Program Files\nodejs\node.exe .\dist\4_Node_js_questions\Question5.js
//{4: '4'}
//parseJSON('{"name":"Yuda"}').then((res)=>{console.log(JSON.stringify(res))}).catch((err)=>{console.log(err.message)});
//C:\Program Files\nodejs\node.exe .\dist\4_Node_js_questions\Question5.js
//{"name":"Yuda"}
getUserName('{"name":"Yuda"}').then((res) => { console.log(JSON.stringify(res)); }).catch((err) => { console.log(err.message); });
//C:\Program Files\nodejs\node.exe .\dist\4_Node_js_questions\Question5.js
//"Yuda"
getUserName('{ul').then((res) => { console.log(JSON.stringify(res)); }).catch((err) => { console.log(err.message); });
//C:\Program Files\nodejs\node.exe .\dist\4_Node_js_questions\Question5.js
//Expected property name or '}' in JSON at position 1 (line 1 column 2)
//# sourceMappingURL=Question5.js.map