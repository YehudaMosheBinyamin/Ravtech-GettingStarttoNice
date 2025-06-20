import { resolve } from "path";
// Question 3
function squareRoot(a:number):Promise<number>{
    return new Promise((resolve,reject)=>
        {if(a<0){
            reject(new Error("Needs to be positive"))
        }
        else{
            resolve(Math.sqrt(a));
        }
    })
}
squareRoot(1).then((result)=>console.log(result)).catch((err)=>console.log(err.message));