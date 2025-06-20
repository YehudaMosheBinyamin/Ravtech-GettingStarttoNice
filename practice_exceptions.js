function parseJSON(str) {
  return new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(str));
    } catch (err) {
      reject(err + "OOPS");
    }
  });
}

//parseJSON('{"name": "Alice"}')
parseJSON("]{:df43t");
// .then((data) => console.log(data.name))
// .catch((error) => console.log("Error:", error));
