import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  BatchWriteCommand,
  QueryCommand,
  GetCommand,
  UpdateCommand
  // DeleteCommand,
  // TransactWriteItemsCommand
} from '@aws-sdk/lib-dynamodb';

import { credentials, region } from './credentials';

const dbclientV3 = DynamoDBDocumentClient.from(new DynamoDBClient({ credentials, region }));

const TEST_TABLE_NAME = 'TEST_TABLE_NAME';

const putItem = async (item: Object) => {
  const { Attributes } = await dbclientV3.send(new PutCommand({ TableName: TEST_TABLE_NAME, Item: item }));
  return Attributes;
};

const putItems = async (items: Record<string, any>[]) => {
  await dbclientV3.send(
    new BatchWriteCommand({ RequestItems: { [TEST_TABLE_NAME]: items.map(item => ({ PutRequest: { Item: item } })) } })
  );
  return items;
};

const getItem = async (PK: String, SK: String) => {
  const { Item = null } = await dbclientV3.send(new GetCommand({ TableName: TEST_TABLE_NAME, Key: { PK, SK } }));
  return Item;
};

const getItemsGSI = async <T>(
  indexName: String,
  {
    KeyConditionExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues
  }: { KeyConditionExpression: string; ExpressionAttributeNames: Record<string, string>; ExpressionAttributeValues: Object }
): Promise<T[]> => {
  const { Items = [] } = await dbclientV3.send(
    new QueryCommand({
      TableName: TEST_TABLE_NAME,
      IndexName: indexName.toString(),
      KeyConditionExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues
    })
  );
  return Items as T[];
};

const updateItem = async <T>(
  PK: String,
  SK: String,
  UpdateExpression: String,
  ExpressionAttributeNames: Record<string, string>,
  ExpressionAttributeValues: Object
) => {
  const { Attributes = {} } = await dbclientV3.send(
    new UpdateCommand({
      TableName: TEST_TABLE_NAME,
      Key: { PK, SK },
      UpdateExpression: UpdateExpression.toString(),
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    })
  );
  return Attributes as T;
};

export { putItem, putItems, getItem, getItemsGSI, updateItem };

// TODO: Optimize GETS,POSTS,PATCHs,PUTS with transactions or batch operations in all controllers.
// TODO: Implementar lógica de borrado lógico en los endpoints delete.
