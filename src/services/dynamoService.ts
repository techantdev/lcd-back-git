const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  PutCommand,
  // QueryCommand,
  GetCommand
  // UpdateCommand,
  // DeleteCommand,
  // TransactWriteItemsCommand
} = require('@aws-sdk/lib-dynamodb');

const dbclientV3 = DynamoDBDocumentClient.from(new DynamoDBClient());

const TEST_TABLE_NAME = 'TEST_TABLE_NAME';

const putItem = async (item: Object) => {
  const { Attributes } = await dbclientV3.send(new PutCommand({ TableName: TEST_TABLE_NAME, Item: item }));
  return Attributes;
};

const getItem = async (PK: String, SK: String) => {
  const { Item = null } = await dbclientV3.send(new GetCommand({ TableName: TEST_TABLE_NAME, Key: { PK, SK } }));
  return Item;
};

export { putItem, getItem };
