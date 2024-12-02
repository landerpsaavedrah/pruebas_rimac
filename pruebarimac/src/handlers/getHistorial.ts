import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event) => {
  const { page = '1', limit = '10' } = event.queryStringParameters || {};
  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);

  if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber < 1 || pageSize < 1) {
    return {
      statusCode: 400,
      body: JSON.stringify({ mensaje: 'Parámetros inválidos. Asegúrate de que page y limit sean números positivos.' }),
    };
  }

  try {
    // Escanear la tabla DynamoDB
    const result = await dynamoDb.scan({
      TableName: process.env.DYNAMODB_TABLE as string,
    }).promise();

    const items = result.Items || [];
    const totalItems = items.length;

    // Paginar los resultados
    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedItems = items.slice(startIndex, startIndex + pageSize);

    return {
      statusCode: 200,
      body: JSON.stringify({
        totalItems,
        page: pageNumber,
        limit: pageSize,
        items: paginatedItems,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ mensaje: 'Error al obtener el historial.', error: error instanceof Error ? error.message : 'Unknown error' }),
    };
  }
};

