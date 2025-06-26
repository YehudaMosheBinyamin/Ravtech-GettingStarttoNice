const express = require("express");
const app = express();

const AWS = require("aws-sdk");
const { table } = require("console");
const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });
async function insertItem(
  id,
  idName = "bookId",
  tableName = "Books",
  extraColumnName = undefined,
  extraColumnValue = undefined
) {
  console.log("Starting insert item process....");
  let obj = {
    [idName]: id,
  };
  console.log(obj);
  if (extraColumnName && extraColumnValue) {
    obj[extraColumnName] = extraColumnValue;
  }

  /**return await dynamoDB
    .put({
      TableName: tableName,
      Item: {
        [id]: id
      },
    })
    .promise();*/
  return await dynamoDB
    .put({
      TableName: tableName,
      Item: obj,
    })
    .promise();
}

async function findItem(id, tableName = "Books", idName = "bookId") {
  console.log(tableName);
  console.log(idName);
  let params = {
    TableName: tableName,
    Key: {
      [idName]: id,
    },
  };
  console.log(JSON.stringify(params));
  return await dynamoDB.get(params).promise();
}

async function updateItem(id, title) {
  console.log("Starting update book process....");
  return await dynamoDB
    .put({
      TableName: "Books",
      Item: {
        bookId: id,
        title: title,
      },
    })
    .promise();
}

//Heavily based funciton on ChatGPT
async function deleteItem(id) {
  const params = {
    TableName: "Books",
    Key: { bookId: id },
  };
  return await dynamoDB.delete(params).promise();
}

//http://localhost:8000/books/38
app.get("/books/:id", async (req, res, next) => {
  try {
    console.log("Getting item...");
    let id;
    if ("id" in req.params && req.params.id !== undefined) {
      id = req.params.id;
    }
    await findItem(id).then((result) => {
      let resultObject = JSON.parse(JSON.stringify(result));
      if ("Item" in result) {
        res.send(resultObject.Item);
      } else {
        throw new Error("No id found in the table. Try with an existing key");
      }
    });
  } catch (err) {
    next(err);
  }
});

app.post("/books", async (req, res) => {
  console.log("Entered insert item");
  // let id = "" + Math.floor(Math.random() * 100);
  let id = "38";
  await findItem(id, (tableName = "Authors"), (idName = "authorId")).then(
    (result) => {
      let resultObject = JSON.parse(JSON.stringify(result));
      if (!("Item" in resultObject)) {
        throw new Error("No author id found for this book");
      }
    }
  );
  await insertItem(
    id,
    (idName = "bookId"),
    (tableName = "Books"),
    (extraColumnName = "isAvailable"),
    (extraColumnValue = "True")
  ).then((result) => res.send(JSON.parse(JSON.stringify(result))));
});

app.post("/borrow/:borrowerId/:bookId", async (req, res) => {
  console.log("Entered borrow item");
  let borrowerId = req.params.borrowerId;
  let bookId = req.params.bookId;
  await findItem(bookId).then((result) => {
    let resultObject = JSON.parse(JSON.stringify(result));
    if (!("Item" in resultObject)) {
      throw new Error("Error borrowing: Book not found");
    }
    if (
      !resultObject["Item"].isAvailable ||
      resultObject["Item"].isAvailable !== "True"
    ) {
      throw new Error("Error: Book not available");
    }
  });
  res.send("Success!");
  //HERE NEEDS MORE WORKS..................................................
  //await insertItem(id).then((result) =>
  //  res.send(JSON.parse(JSON.stringify(result)))
  //);
});

app.put("/books/:id", async (req, res) => {
  let title = "MEEE" + Math.floor(Math.random() * 100);
  console.log("Entered update title of book");
  let id;
  if ("id" in req.params && req.params.id !== undefined) {
    id = req.params.id;
  } else {
    throw new Error("Missing id parameter for updating item");
  }
  await updateItem(id, title).then((result) =>
    res.send(JSON.parse(JSON.stringify(result)))
  );
});
//Next function From ChatGPT, with slight changes and understanding
app.delete("/books/:id", async (req, res) => {
  let id;
  if ("id" in req.params && req.params.id !== undefined) {
    id = req.params.id;
  }
  await deleteItem(id).then((result) => res.send(result));
});

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

app.listen(8000);
