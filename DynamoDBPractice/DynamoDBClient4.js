const express = require("express");
const app = express();
/** 
import {
  DynamoDBClient,
  ListTablesCommand,
  CreateTableCommand,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
 */
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const AWS = require("aws-sdk");
const { table } = require("console");
const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });

// Function to insert an item
async function insertItem_v3(tableName, extraColumns = {}) {
  console.log("Starting insert item process....");
  const dynamoDBClient = new DynamoDBClient({ region: "eu-north-1" });
  let obj = {
    TableName: tableName,
    Item: {},
  };
  console.log("extraColumns: " + extraColumns);
  for (let key in extraColumns) {
    if (key == "RegistrationDate") {
      //For other types
      obj.Item[key] = { N: `${extraColumns[key]}` };
    } else {
      obj.Item[key] = { S: `${extraColumns[key]}` };
    }
  }

  console.log(JSON.stringify(obj));

  const command = new PutItemCommand(obj);
  return new Promise((resolve, reject) => {
    dynamoDBClient.send(command, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  //return await dynamoDB.send(command);
}
async function getUserBetweenDates() {
  const params = {
    TableName: "Users",
    IndexName: "userId-RegistrationDate-index",
    KeyConditionExpression:
      "userId = :uid AND RegistrationDate BETWEEN :start AND :end",
    ExpressionAttributeValues: {
      ":uid": "12010",
      ":start": 20230101,
      ":end": 20231231,
    },
  };
  return await dynamoDB.query(params).promise();
}

function getDateThirtyDaysAgo() {
  return 1;
}

async function func() {
  //EX_3 of indexes: Check length of time to run indexes
  const start = Date.now();
  let projectId = "30000";
  for (let i = 0; i < 1; i++) {
    /** 
    let date = Date.now();
    let status = "NonRunYet";
    await insertItem_v3("Projects", {
      projectId: projectId,
      startDate: date,
      status: status,
    });
    */
    await insertItem_v3("Users", {
      userId: projectId,
      RegistrationDate: 20231010,
      userId6: "7",
    });
    projectId++;
  }
}
try {
  let getDate30DaysAgo = getDateThirtyDaysAgo();
  //func();
  const start = Date.now();
  getUserBetweenDates()
    .then((res) => {
      console.log(`${JSON.stringify(res)} Time: ${Date.now() - start}ms`);
    })
    .catch((err) => {
      console.log(err);
    });
} catch (errr) {
  console.log(errr);
}
//LSI: {"Items":[{"userId6":"7","RegistrationDate":20231010,"userId":"12010"}],"Count":1,"ScannedCount":1} Time: 1588ms
//GSI: {"Items":[{"userId6":"7","RegistrationDate":20231010,"userId":"12010"}],"Count":1,"ScannedCount":1} Time: 511ms

//First way: Time: 348178ms
//Second way after GSI: 337717ms
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
