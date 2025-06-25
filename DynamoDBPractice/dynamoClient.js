const {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: "eu-north-1" });

// 2. Define item to insert
const putParams = {
  TableName: "Table3",
  Item: {
    id: { S: "1234" },
    name: { S: "John Doge" },
  },
};

// 3. Write the item
async function putItem() {
  const command = new PutItemCommand(putParams);
  await client.send(command);
  console.log("Item written");
}

// 4. Define item to retrieve
const getParams = {
  TableName: "Table3",
  Key: { id: { S: "1234" } },
};

// 5. Read the item
async function getItem() {
  const command = new GetItemCommand(getParams);
  const response = await client.send(command);
  console.log("Item read:", response.Item);
}

// Run the functions
putItem().then(getItem).catch(console.error);
/**
 * PS C:\Users\danbe\Ravtech-GettingStarttoNice\DynamoDBPractice> node .\dynamoClient.js
Item written
Item read: { id: { S: '1234' }, name: { S: 'John Doge' } }
 */
