const {
  DynamoDBClient,
  ListTablesCommand,
  CreateTableCommand,
} = require("@aws-sdk/client-dynamodb");

const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });
const { error } = require("console");
const client = new DynamoDBClient({ region: "eu-north-1" });
const express = require("express");
let app = express();
async function listAvailableTables() {
  let command = new ListTablesCommand({});
  const response = await client.send(command);
  return response;
}

async function createTable(id) {
  let command = new CreateTableCommand({
    AttributeDefinitions: [
      {
        AttributeName: "Id", // required
        AttributeType: "S",
      },
    ],
    TableName: "Table" + id, // required,
    BillingMode: "PAY_PER_REQUEST", // מצב חישוב
    KeySchema: [
      // KeySchema // required
      {
        // KeySchemaElement
        AttributeName: "Id", // required
        KeyType: "HASH", // required
      },
    ],
  });
  const response = await client.send(command);
  return response;
}
async function findItem(id) {
  return await dynamoDB
    .get({
      TableName: "Table3",
      Key: {
        id: id,
      },
    })
    .promise();
}

async function updateItem(id) {
  console.log("Starting update item process....");
  return await dynamoDB
    .put({
      TableName: "Table3",
      Item: {
        id: id,
        name: "Elon Musk",
      },
    })
    .promise();
}
//Heavily based funciton on ChatGPT
async function deleteItem(id) {
  const params = {
    TableName: "Table3",
    Key: { id: id },
  };
  return await dynamoDB.delete(params).promise();
}
app.get("/createtable/:id", async (req, res, next) => {
  try {
    console.log("Creating table...");
    let id;
    if ("id" in req.params && req.params.id !== undefined) {
      id = req.params.id;
    }
    await createTable(id).then((result) => res.send(result));
  } catch (err) {
    next(err);
  }
});

//Next function From ChatGPT, with slight changes and understanding
app.delete("/deleteitem/:id", async (req, res) => {
  let id;
  if ("id" in req.params && req.params.id !== undefined) {
    id = req.params.id;
  }
  await deleteItem(id).then((result) => res.send(result));
});

app.get("/getitem/:id", async (req, res, next) => {
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

app.get("/", async (req, res) => {
  console.log("Entered get");
  await listAvailableTables().then((result) =>
    res.send(JSON.parse(JSON.stringify(result)).TableNames)
  );
});

app.put("/updateitem/:id", async (req, res) => {
  console.log("Entered update item");
  let id;
  if ("id" in req.params && req.params.id !== undefined) {
    id = req.params.id;
  } else {
    throw new Error("Missing id parameter for updating item");
  }
  await updateItem(id).then((result) =>
    res.send(JSON.parse(JSON.stringify(result)))
  );
});

/**
 * http://localhost:8000/createtable/10499
 * {"$metadata":{"httpStatusCode":200,"requestId":"IFNHIH4OJSAT16IMMF8CUV5SUJVV4KQNSO5AEMVJF66Q9ASUAAJG","attempts":1,"totalRetryDelay":0},"TableDescription":{"AttributeDefinitions":[{"AttributeName":"Id","AttributeType":"S"}],"BillingModeSummary":{"BillingMode":"PAY_PER_REQUEST"},"CreationDateTime":"2025-06-25T12:53:47.765Z","DeletionProtectionEnabled":false,"ItemCount":0,"KeySchema":[{"AttributeName":"Id","KeyType":"HASH"}],"ProvisionedThroughput":{"NumberOfDecreasesToday":0,"ReadCapacityUnits":0,"WriteCapacityUnits":0},"TableArn":"arn:aws:dynamodb:eu-north-1:752140197218:table/Table10499","TableId":"bf7109c7-7296-4d89-92c7-9b93f195ad0b","TableName":"Table10499","TableSizeBytes":0,"TableStatus":"CREATING"}}
 */
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

app.listen(8000);
//http://localhost:8000/createtable/10499
//Creating table...
//["Table1","Table2","Table3"]
//(Next time:)
//{"error":"Table already exists: Table10499"}

//http://localhost:8000/getitem/1234/
//Getting item...
//{"id":"1234","name":"John Doge"}

//http://localhost:8000/getitem/12374/
/** 
{
    "error": "No id found in the table. Try with an existing key"
}
    */

//http://localhost:8000/updateitem/123
//Entered update item
//Starting update item process....

/**
 * When error forced:
 * {
    "error": "Missing id parameter for updating item"
}
 */

//http://localhost:8000/deleteitem/12369
//(Successful delete) {}

//(Forced error with same input)
//{
//   "error": "Problerm"
//}
