const {
  DynamoDBClient,
  CreateTableCommand,
} = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  TransactWriteCommand,
  TransactGetCommand,
} = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({ region: "eu-north-1" });

//Stage 5: Get balance and then transfer sum between accounts in transactions:
async function readTotal() {
  const docClient = DynamoDBDocumentClient.from(client);
  return await docClient.send(
    new TransactGetCommand({
      TransactItems: [
        {
          Get: {
            TableName: "Accounts",
            Key: {
              accountId: "B",
            },
          },
        },
      ],
    })
  );
}
//Stage 3:Transfer sum between accounts in transactions:
async function transferSum() {
  const docClient = DynamoDBDocumentClient.from(client);
  return await docClient.send(
    new TransactWriteCommand({
      TransactItems: [
        {
          Update: {
            TableName: "Accounts",
            Key: {
              accountId: "A",
            },
            UpdateExpression: "SET balance = balance -:amount",
            ConditionExpression: "balance >=:amount",
            ExpressionAttributeValues: { ":amount": 20 },
          },
        },
        {
          Update: {
            TableName: "Accounts",
            Key: { accountId: "B" },
            UpdateExpression: "SET balance=balance+:amount",
            ExpressionAttributeValues: {
              ":amount": 20,
            },
          },
        },
        {
          Put: {
            TableName: "Logs",
            Item: {
              logId: Date.now().toString(),
              from: "A",
              to: "B",
              amount: 20,
              timestamp: new Date().toISOString(),
            },
          },
        },
      ],
    })
  );
}

//Page 2:Question 3
async function transferSumNewCondition() {
  const docClient = DynamoDBDocumentClient.from(client);
  return await docClient.send(
    new TransactWriteCommand({
      TransactItems: [
        {
          Update: {
            TableName: "Accounts",
            Key: {
              accountId: "A",
            },
            UpdateExpression: "SET balance = balance -:amount",
            ConditionExpression: "balance >=:amount AND balance >:min",
            ExpressionAttributeValues: { ":amount": 50, ":min": 100 },
          },
        },
        {
          Update: {
            TableName: "Accounts",
            Key: { accountId: "B" },
            UpdateExpression: "SET balance=balance+:amount",
            ExpressionAttributeValues: {
              ":amount": 50,
            },
          },
        },
        {
          Put: {
            TableName: "Logs",
            Item: {
              logId: Date.now().toString(),
              from: "A",
              to: "B",
              amount: 50,
              timestamp: new Date().toISOString(),
            },
          },
        },
      ],
    })
  );
}

//Page 2:Question 3
async function transferSumTransactionReporting() {
  const docClient = DynamoDBDocumentClient.from(client);
  return await docClient.send(
    new TransactWriteCommand({
      TransactItems: [
        {
          Update: {
            TableName: "Accounts",
            Key: {
              accountId: "A",
            },
            UpdateExpression: "SET balance = balance -:amount",
            ConditionExpression: "balance >=:amount AND balance >:min",
            ExpressionAttributeValues: { ":amount": 10, ":min": 100 },
          },
        },
        {
          Update: {
            TableName: "Accounts",
            Key: { accountId: "B" },
            UpdateExpression: "SET balance=balance+:amount",
            ExpressionAttributeValues: {
              ":amount": 10,
            },
          },
        },
        {
          Put: {
            TableName: "Transactions",
            Item: {
              transactionsId: Date.now().toString(),
              fromAccount: "A",
              toAccount: "B",
              amount: 10,
              timestamp: new Date().toISOString(),
            },
          },
        },
      ],
    })
  );
}

//Page 2:Question 5
//Pass from A to B and then from B to C in the same transaction
async function transferSumThreeAccounts() {
  const docClient = DynamoDBDocumentClient.from(client);
  return await docClient.send(
    new TransactWriteCommand({
      TransactItems: [
        {
          Update: {
            TableName: "Accounts",
            Key: {
              accountId: "A",
            },
            UpdateExpression: "SET balance = balance -:amount",
            ConditionExpression: "balance >=:amount AND balance >:min",
            ExpressionAttributeValues: { ":amount": 10, ":min": 100 },
          },
        },
        {
          Update: {
            TableName: "Accounts",
            Key: { accountId: "B" },
            UpdateExpression: "SET balance=balance+:amount",
            ExpressionAttributeValues: {
              ":amount": 10,
            },
          },
        },
        {
          Put: {
            TableName: "Transactions",
            Item: {
              transactionsId: Date.now().toString(),
              fromAccount: "A",
              toAccount: "B",
              amount: 10,
              timestamp: new Date().toISOString(),
            },
          },
        },
        {
          Update: {
            TableName: "Accounts",
            Key: {
              accountId: "B",
            },
            UpdateExpression: "SET balance = balance -:amount",
            ConditionExpression: "balance >=:amount AND balance >:min",
            ExpressionAttributeValues: { ":amount": 10, ":min": 100 },
          },
        },
        {
          Update: {
            TableName: "Accounts",
            Key: { accountId: "C" },
            UpdateExpression: "SET balance=balance+:amount",
            ExpressionAttributeValues: {
              ":amount": 10,
            },
          },
        },
        {
          Put: {
            TableName: "Transactions",
            Item: {
              transactionsId: Date.now().toString(),
              fromAccount: "B",
              toAccount: "C",
              amount: 10,
              timestamp: new Date().toISOString(),
            },
          },
        },
      ],
    })
  );
}

const docClient = DynamoDBDocumentClient.from(client);

async function insertion() {
  const docClient = DynamoDBDocumentClient.from(client);

  await docClient.send(
    new PutCommand({
      TableName: "Accounts",
      Item: { accountId: "A", balance: 500 },
    })
  );
  await docClient.send(
    new PutCommand({
      TableName: "Accounts",
      Item: { accountId: "B", balance: 300 },
    })
  );
  return 1;
}
async function createNewTable() {
  await client.send(
    new CreateTableCommand({
      TableName: "Accounts",
      KeySchema: [{ AttributeName: "accountId", KeyType: "HASH" }],
      AttributeDefinitions: [
        { AttributeName: "accountId", AttributeType: "S" },
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    })
  );
}
/**createNewTable()
  .then((res) => console.log("done"))
  .catch((err) => console.log(err));
  */
/** 
insertion()
  .then((res) => console.log("done"))
  .catch((err) => console.log(err));


transferSum()
  .then((res) => console.log("done"))
  .catch((err) => {
    if (err.name == "TransactionCanceledException") {
      console.log("The transaction failed based on insufficient funds");
    } else {
      console.log(err);
    }
  });
  */
//4. The transaction failed based on insufficient funds
/** 
readTotal()
  .then((res) => {
    console.log(res["Responses"][0]["Item"]["balance"]);
  })
  .then((res) => transferSum())
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
  });
/** 
PS C:\Users\danbe\Ravtech-GettingStarttoNice\DynamoDBPractice> node .\Transactions1.js
400*/

/**
transferSumNewCondition()
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
  });

 * PS C:\Users\danbe\Ravtech-GettingStarttoNice\DynamoDBPractice> node .\Transactions1.js
{
  '$metadata': {
    httpStatusCode: 200,
    requestId: 'NMTR5PUD96RI27Q3JIL4R9DDEJVV4KQNSO5AEMVJF66Q9ASUAAJG',
    extendedRequestId: undefined,
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  }
}

transferSumTransactionReporting()//Works
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
  });
 */

transferSumThreeAccounts() //Works
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
  });
