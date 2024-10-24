import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const result = await dynamoDb.scan({
      TableName: process.env.DYNAMODB_TABLE as string,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ items: result.Items }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ mensaje: 'Error al obtener los elementos', error: (error instanceof Error) ? error.message : 'Unknown error' }),
    };
  }
};