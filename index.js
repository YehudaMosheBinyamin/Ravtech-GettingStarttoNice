const rs = require("node:fs");
const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let fileName = "";
rl.question("Enter a filename\n", (userInput) => {
  fileName = userInput;
  console.log(fileName);
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

//PS C:\Users\danbe\Ravtech-GettingStarttoNice> node index
//Enter a filename
//numbers_file.txt
//numbers_file.txt
//Total is:-3
class User {}
const express = require("express");
const app = express();
let names = [];
let passwords = [];
let matcher = new Map();
app.post("/register", (req, res) => {
  let new_user_details = req._parsedUrl.query;
  let name_and_password = new_user_details.split("&");
  let name_itself = name_and_password[0].split("=")[1]; //Query will have parameter= as well. that must be ignored
  names.push(name_itself);
  let password_itself = name_and_password[1].split("=")[1].slice(0, -1); //Similar.has / at the end that must be ignored as well
  passwords.push(password_itself);
  matcher.set(password_itself, name_itself);
  res.send("Entered details.");
});
app.get("/users", (req, res) => {
  console.log("In get");
  res.send(names);
});
app.listen(3000, () => {
  console.log("Server is up and running");
});
var https = require("https");
https.get(
  "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
  (res) => {
    res.on("data", (d) => {
      //process.stdout.write(d);
      let dataObj = JSON.parse(d);
      console.log(
        "Symbol:" + dataObj.symbol + " Current Price:" + dataObj.price
      );
    });
  }
);
//Symbol:BTCUSDT Current Price:104522.71000000
