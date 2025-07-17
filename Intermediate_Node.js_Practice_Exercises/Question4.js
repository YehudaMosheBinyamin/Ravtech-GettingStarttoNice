const rs = require("node:fs");
if (process.argv.length == 4) {
  if (process.argv[2] === "add") {
    rs.readFile("list_info.json", "utf-8", async (err, data) => {
      let all_info_json = await JSON.parse(data);
      all_info_json.info.push(process.argv[3]);
      let s = JSON.stringify(all_info_json);
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
      let filtered_list = all_info_json["info"].filter(
        (elem) => elem != process.argv[3]
      );
      console.log(filtered_list);
      rs.writeFile(
        "list_info.json",
        JSON.stringify({ info: filtered_list }),
        "utf-8",
        () => {
          console.log("Done Writing");
        }
      );
    });
  } else {
    console.error("Wrong parameters entered. either add or delete");
  }
} else if (process.argv.length < 4) {
  if (process.argv[2] == "list") {
    rs.readFile("list_info.json", "utf-8", (err, data) => {
      console.log(data); //node app.js list
      //["Drucker"]
    });
  } else {
    console.error("Enter: node app.js list");
  }
} else {
  console.error("Too many parameters");
}
