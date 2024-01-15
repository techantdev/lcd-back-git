const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  GetCommand
  // UpdateCommand,
  // DeleteCommand,
  // TransactWriteItemsCommand
} = require('@aws-sdk/lib-dynamodb');

import { credentials, region } from './credentials';

const dbclientV3 = DynamoDBDocumentClient.from(new DynamoDBClient({ credentials, region }));

const TEST_TABLE_NAME = 'TEST_TABLE_NAME';

const putItem = async (item: Object) => {
  const { Attributes } = await dbclientV3.send(new PutCommand({ TableName: TEST_TABLE_NAME, Item: item }));
  return Attributes;
};

const getItem = async (PK: String, SK: String) => {
  const { Item = null } = await dbclientV3.send(new GetCommand({ TableName: TEST_TABLE_NAME, Key: { PK, SK } }));
  return Item;
};

const getItemsGSI = async (
  indexName: String,
  {
    KeyConditionExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues
  }: { KeyConditionExpression: String; ExpressionAttributeNames: Object; ExpressionAttributeValues: Object }
) => {
  const { Items = null } = await dbclientV3.send(
    new QueryCommand({
      TableName: TEST_TABLE_NAME,
      IndexName: indexName,
      KeyConditionExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues
    })
  );
  return Items;
};

export { putItem, getItem, getItemsGSI };
