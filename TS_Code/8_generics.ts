function swap<T> (one:T, two:T):T[]{
    return [two,one];
}

let arr:number[] = swap(2,1);
console.log(JSON.stringify(arr));
//[1,2]
let arr3:string[] = swap("2","1");
console.log(JSON.stringify(arr3));
//["1","2"]

let arr4:string[][] = swap(["15","25"],["185","285"]);
console.log(JSON.stringify(arr4));
//[["185","285"],["15","25"]]

function lastElement<T>(elem:T[]):T| undefined{
    if(elem.length == 0){
        return undefined;
    }
    return elem[elem.length-1];
}
 
console.log(lastElement([1, 2, 3]));      // 3 
console.log(lastElement(["a", "b"]));     // "b" 
console.log(lastElement([]));             // undefined 
console.log(lastElement([{"444":"3333"},{"908":"3338773"}]));   //{ '908': '3338773' }


class Stack<T>{
    private stack:T[];
    constructor(){
        this.stack = [];
    }
    push(newElem:T):void{
        this.stack.push(newElem);
    }
    pop():T|undefined{
        return this.stack.pop();
    }
}
const stack = new Stack<number>(); 
stack.push(1); 
stack.push(2); 
console.log(stack.pop()); // 2 

const stack2 = new Stack<string>(); 
stack2.push("6"); 
stack2.push("2"); 
console.log(stack2.pop()); //2
//ChatGPT
function mergeObjects<U extends object,T extends object>(obj1: U , obj2:T ):U & T{
 return { ...obj1, ...obj2 };
}

const obj1 = { name: "Alice" }; 
const obj2 = { age: 25 }; 
console.log(mergeObjects(obj1, obj2)); // { name: "Alice", age: 25 } 
// mergeObjects(42, "test"); // שגיאה 

abstract class Entity{
    protected id:number;
    constructor(id:number){
        this.id = id;
    }
    abstract getDetails():string;
}
class User extends Entity{
    name:string;
    constructor(id:number,name:string){
        super(id);
        this.name = name;
    }
    getDetails():string{
        return `User: ${this.name},ID: ${this.id}`;
    }
}

class Product extends Entity{
    price:number;
    constructor(id:number, price:number){
        super(id);
        this.price = price;
    }
    getDetails():string{
        return `Product price: ${this.price},ID: ${this.id}`;
    }
}

function processEntity<T extends Entity>(one:T){
    return one.getDetails();
}

const user = new User(1, "Alice"); 
const product = new Product(2, 99.99); 
console.log(processEntity(user));    
console.log(processEntity(product)); 
//User: Alice,ID: 1
//Product price: 99.99,ID: 2