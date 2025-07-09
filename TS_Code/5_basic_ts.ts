import { create } from "domain";

function greet(name:string):string{
    let greeting:string = `Hello ${name}!`;
    return greeting;
}
function getNamesLength(namesArr:string[]):number[]{
    let sizes: number[] = namesArr.map(elem=>elem.length);
    return sizes;
}
function introduce(name:string, age?:number):string{
    if(!(typeof(age) === 'undefined')){
     return `Hello, my name is ${name} and I am ${age} years old.`;
    }
    else{
        return `Hello, my name is ${name}`;
    }
}
interface User{
    name: string;
    age:number;
    email?:string;
}
class User2 implements User{
   constructor (public name: string,
    public age:number,
    public email?:string){}
}
function printUser(user1: User): void {
   let text: string = `Name: ${user1.name}, Age: ${user1.age}, Email: `;
    let email: string = user1.email? user1.email: "Not provided";
    console.log(text+email);
}
class User1{
    constructor(public name:string, public age:number, public isAdmin:boolean){}
}
function createUser(name:string, age:number, isAdmin:boolean){
 return new User1(name,age,isAdmin);
}

console.log(greet('Yehuda'));
//Hello Yehuda!
console.log(getNamesLength(["Haim", "Yael", "David"]));
//[ 4, 4, 5 ]

console.log(introduce('John', 60));
//Hello, my name is John and I am 60 years old.
console.log(introduce('John'));
//Hello, my name is John
console.log(JSON.stringify(createUser('John',80, true)));
//{"name":"John","age":80,"isAdmin":true}
let user2: User2 = new User2('John', 97, 'j@g.com');
printUser(user2);
//Name: John, Age: 97, Email: j@g.com
let user22: User2 = new User2('Johnny', 97);
printUser(user22);
//Name: Johnny, Age: 97, Email: Not provided