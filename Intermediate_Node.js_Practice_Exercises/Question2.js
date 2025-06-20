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
//Tested and works properly with Postman:
//PS C:\Users\danbe\Ravtech-GettingStarttoNice\Intermediate_Node.js_Practice_Exercises> node Question2.js
//Server is up and running
//(Posted)
//(In postman): Entered details.
//(Get in Postman):
//Recieved: [
//   "Yuda"
//]
//https://yehudabenjamin.postman.co/workspace/82691bf1-740f-4dfc-88c4-267e060fc740/request/create?requestId=61e04faf-667c-4142-8a55-ed973f8cec7b
