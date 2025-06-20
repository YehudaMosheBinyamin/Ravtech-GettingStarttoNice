"use strict";
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getAge() {
        return this.age;
    }
}
const s = new Student('Alice', 20);
console.log(s.getAge().toFixed(1));
//# sourceMappingURL=index.js.map