const rs = require("node:fs");
const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let fileName = "";
rl.question("Enter a filename\n", (userInput) => {
  fileName = userInput;
  let total = 0;
  rs.readFile(`${fileName}`, "utf-8", (err, data) => {
    let dataByLines = data.split("\n");
    let res = dataByLines.map((line) => parseInt(line));
    res.forEach((element) => {
      total = total + element;
    });
    console.log("Total is:" + total);
  });
  rl.close();
});

/** 
PS C:\Users\danbe\Ravtech-GettingStarttoNice\Intermediate_Node.js_Practice_Exercises> node Question1.js
Enter a filename
numbers_file.txt
Total is:-3
*/
