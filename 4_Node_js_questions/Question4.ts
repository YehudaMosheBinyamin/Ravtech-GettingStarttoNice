import {readFile} from 'fs/promises'
async function readAFile(a:string):Promise<any>{
    try{
    let res:String = await readFile(a,'utf-8');
    console.log(res);
    }
    catch(err:any){
        console.log(err.message);
    }
}
readAFile('4_Node_js_questions/abstract.txt');

//When doesn't exist:
//C:\Program Files\nodejs\node.exe .\dist\4_Node_js_questions\Question4.js
//ENOENT: no such file or directory, open 'C:\Users\danbe\Ravtech-GettingStarttoNice\abstract.txt'

//C:\Program Files\nodejs\node.exe .\dist\4_Node_js_questions\Question4.js
//Some text