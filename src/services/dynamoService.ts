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
  // console.log({ PK, SK, UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues });

  const { Attributes = {} } = await dbclientV3.send(
    new UpdateCommand({
      TableName: TEST_TABLE_NAME,
      Key: { PK, SK },
      UpdateExpression: UpdateExpression.toString(),
      ...(ExpressionAttributeNames && { ExpressionAttributeNames }),
      ...(ExpressionAttributeValues && { ExpressionAttributeValues }),
      ReturnValues: 'ALL_NEW'
    })
  );
  return Attributes as T;
};

// Utils

const getUpdateFields = (data: Record<string, any>) => {
  return {
    set: Object.keys(data)
      .map(key => `#${key}=:${key}`)
      .join(','),
    keys: Object.keys(data).reduce((prev, key) => ({ ...prev, [`#${key}`]: key }), {}),
    values: Object.entries(data).reduce((prev, [key, value]) => ({ ...prev, [`:${key}`]: value }), {})
  };
};

export { putItem, putItems, getItem, getItemsGSI, updateItem, getUpdateFields };
