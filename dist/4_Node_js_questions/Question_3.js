"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Question 3
function squareRoot(a) {
    return new Promise((resolve, reject) => {
        if (a < 0) {
            reject(new Error("Needs to be positive"));
        }
        else {
            resolve(Math.sqrt(a));
        }
    });
}
squareRoot(1).then((result) => console.log(result)).catch((err) => console.log(err.message));
//# sourceMappingURL=Question_3.js.map