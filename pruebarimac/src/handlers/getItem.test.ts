import { handler } from './getItem';
import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyResult } from 'aws-lambda';

jest.mock('aws-sdk', () => {
  const DocumentClient = {
    scan: jest.fn().mockReturnThis(),
    promise: jest.fn().mockResolvedValue({ Items: [{ id: '1', nombre: 'Luke Skywalker' }] }),
  };
  return { DynamoDB: { DocumentClient: jest.fn(() => DocumentClient) } };
});

describe('getItem handler', () => {
  it('should get items successfully', async () => {
    const response = await handler({} as any, {} as any, () => {}) as APIGatewayProxyResult;

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).items).toEqual([{ id: '1', nombre: 'Luke Skywalker' }]);
  });

  it('should return an error if there is a problem', async () => {
    (DynamoDB.DocumentClient.prototype.scan as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DynamoDB error');
    });

    const response = await handler({} as any, {} as any, () => {}) as APIGatewayProxyResult;

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).mensaje).toBe('Error al obtener los elementos');
  });
});