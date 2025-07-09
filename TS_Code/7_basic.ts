import { stringList } from "aws-sdk/clients/datapipeline";

class Dog{
    name:string;
    age:number;
    constructor(name:string,
     age:number){
        this.age = age;
        this.name = name;
     }
     bark():string{
        return "Woof Woof!"
     }
}
class BankAccount{
    private balance:number;
    public accountNumber:string;
    constructor(balance:number, accountNumber:string){
        this.balance = balance;
        this.accountNumber = accountNumber;
    }
    getBalance():number{
        return this.balance;
    }
}

class Vehicle{
    public brand:string;
    protected speed:number;
    constructor(brand:string, speed:number){
        console.log("Enter vehicle constructor");
        this.brand = brand;
        this.speed = speed;
    }
    move():string{
        return "The vehicle is moving";
    }
}

class Car extends Vehicle{
    public doors:number;
    constructor(brand:string, speed:number,doors:number){
        super(brand, speed);
        this.doors = doors;
    }
    honk():string{
        return "Beep Beep!";
    }
}

interface Shape{
    getArea():number;
}

class Rectangle implements Shape {
    height:number;
    width:number;
    constructor(    height:number,
    width:number){
        this.height = height;
        this.width = width;
    }
    getArea(): number {
        return this.height*this.width;
    }
}

class MathUtils{
    static PI:number = 3.14;
    static circleArea(radius:number):number{
        return radius*radius*this.PI;
    }
}

interface Printable{
    print():string
}

class Product{
    constructor(public name:string, public price:number){
    }
}
class Book extends Product implements Printable{
        constructor(name:string,price:number,public author:string){
            super(name,price);
       }
       print():string{
        return `Book: ${this.name}, Price: ${this.price}, Author: ${this.author}`;
       }
}

class Library{
    private books:Book[];
    constructor(){
        this.books = [];
    }
    addBook(book:Book):void{
        this.books.push(book);
    }
    printAllBooks():void{
        for(let elem of this.books){
            console.log(elem.print());
        }
    }
}
let dog:Dog = new Dog('efg',325);
console.log(dog.bark());
//Woof Woof!
let bankAccount = new BankAccount(23,"gthht");
/** 
console.log(bankAccount.balance);
7_basic.ts:31:25 - error TS2341: Property 'balance' is private and only accessible within class 'BankAccount'.
*/

let car: Car = new Car('Buick',4324, 3);
//Enter vehicle constructor


let re:Rectangle = new Rectangle(334,654);
console.log(re.getArea());
//218436

console.log(MathUtils.circleArea(1));
//3.14

let book:Book = new Book("Harry Potter", 2100, "JK Rowling");
console.log(book.print());
//Book: Harry Potter, Price: 2100, Author: JK Rowling

let book2:Book = new Book("Harr4y Pott4er", 2100, "JK Ro4wling");
let lib:Library = new Library();
lib.addBook(book);
lib.addBook(book2);
lib.printAllBooks();

//Book: Harry Potter, Price: 2100, Author: JK Rowling
//Book: Harr4y Pott4er, Price: 2100, Author: JK Ro4wling