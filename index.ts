interface Person {
  name: string;
  age: number;
}

class Student implements Person {
  constructor(public name: string, public age: number) {}

  getAge(): number {
    return this.age;
  }
}

const s = new Student('Alice', 20);
console.log(s.getAge().toFixed(1));
