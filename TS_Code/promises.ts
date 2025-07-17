//Corrected by chatgpt
async function delayMessage(message:string):Promise<string>{
   await new Promise<void>((resolve)=>{setTimeout(resolve,1000)});  
   return message;
}
delayMessage("ddddd").then((data:string)=>{console.log(data)});
async function checkNumber(num:number):Promise<string>{
    return new Promise<string>((resolve,reject)=>{
        if(num>0){
            resolve("Positive");
        }
        else{
            reject(new Error("Not positive"));
        }

    })
}

async function getRandomNumber():Promise<number>{
await new Promise<void>((resolve)=>{setTimeout(resolve,2000)});
let randomNumber: number = Math.floor(Math.random()*100);
if(randomNumber<50){
    throw new Error("Less than 50");
}
else{
    return randomNumber;
}
}
checkNumber(5).then((result) => console.log(result));  // פלט: Positive 
checkNumber(-3).catch((error) => console.log(error.message)); // פלט: Not positive 

getRandomNumber().then((res:number)=>{console.log(res)}).catch((err:Error)=>{console.log(err)});

async function fetchName():Promise<string>{
    await new Promise<void>((resolve)=>setTimeout(resolve, 1000));
    return "Alice";
}
async function fetchAge():Promise<number>{
    await new Promise<void>((resolve)=>setTimeout(resolve, 2000));
    return 25;
}
async function fetchStatus():Promise<boolean>{
    await new Promise<void>((resolve)=>setTimeout(resolve, 3000));
    return true;
}


Promise.all([fetchAge(),fetchName(),fetchStatus()]).then((values:[number,string,boolean])=>{
    let obj = {
        age: values[0],
        name: values[1],
        active: values[2]
    }
    console.log(JSON.stringify(obj));
}).catch((err:Error)=>{console.log(err.message)});

interface Task{
    id:number,
    title:string,
    completed:boolean
}
async function processTask(id:number):Promise<Task>{
    await new Promise<void>((resolve)=>setTimeout(resolve, 1500));
    if(id % 2 == 0){
        let obj:Task = {id:1,title:"rer",completed:true};
        return obj;
    }
    else{
        throw new Error("Task not found");
    }
}

async function handleTask(id:number){
    try{
    await processTask(id);
    console.log(`Task Task-${id} is completed`);
    }
    catch(err:any){
        console.log(err.message);
    }
}

handleTask(2); // פלט: "Task Task-2 is completed" (למשל) 
handleTask(3); // פלט: "Task not found" 


/** 
Positive
Not positive
ddddd
Task Task-2 is completed
Task not found
64
{"age":25,"name":"Alice","active":true}
*/