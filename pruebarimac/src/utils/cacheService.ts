// src/utils/cacheService.ts


import { DynamoDB } from 'aws-sdk';

const dbClient = new DynamoDB.DocumentClient();

const CACHE_TTL_SECONDS = 1800; // 30 minutos DE CACHE

export const getCachedData = async (key: string) => {
  const result = await dbClient.get({
    TableName: process.env.DYNAMODB_TABLE!,
    Key: { id: key },
  }).promise();

  if (result.Item && (Date.now() - result.Item.timestamp < CACHE_TTL_SECONDS * 1000)) {
    return result.Item.data;
  }

  return null;
};

export const setCachedData = async (key: string, data: any) => {
  await dbClient.put({
    TableName: process.env.DYNAMODB_TABLE!,
    Item: {
      id: key,
      data,
      timestamp: Date.now(),
    },
  }).promise();
};
