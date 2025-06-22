//This code has some issues: need to fix why it doens't write to JSON file with the changes
const rs = require("node:fs");
if (process.argv.length == 4) {
  if (process.argv[2] === "add") {
    rs.readFile("list_info.json", "utf-8", async (err, data) => {
      let all_info_json = await JSON.parse(data);
      if (!("listy" in all_info_json)) {
        all_info_json.listy = [];
      }
      all_info_json.listy.push(process.argv[3]);
      console.log(
        "OPIG" +
          JSON.stringify(all_info_json, (key, value) => {
            console.log("PUJ" + key);
            console.log("PgUJ" + value);
          })
      );
      let s = JSON.stringify(all_info_json);
      console.log(s);
      try {
        rs.writeFile("list_info.json", s, "utf-8", (error) => {
          if (error) {
            console.log(error);
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  } else if (process.argv[2] == "remove") {
    rs.readFile("list_info.json", "utf-8", (err, data) => {
      let all_info_json = JSON.parse(data);
      let filtered_list = all_info_json["list"].filter(
        (elem) => elem != process.argv[3]
      );
      console.log(filtered_list);
      rs.writeFile(
        "list_info.json",
        JSON.stringify(filtered_list),
        "utf-8",
        () => {
          console.log("Done Writing");
        }
      );
    });
  } else {
    console.log("EUGIU&G" + process.argv[2]);
    console.error("Wrong parameters entered. either add or delete");
  }
} else if (process.argv.length < 4) {
  if (process.argv[2] == "list") {
    rs.readFile("list_info.json", "utf-8", (err, data) => {
      console.log(data); //node app.js list
      //"1234"
    });
  } else {
    console.error("Enter: node app.js list");
  }
} else {
  console.error("Too many parameters");
}
