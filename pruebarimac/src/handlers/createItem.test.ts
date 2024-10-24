import { handler } from './createItem';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import { DynamoDB } from 'aws-sdk';

jest.mock('axios');
jest.mock('aws-sdk', () => {
  const DocumentClient = {
    put: jest.fn().mockReturnThis(),
    promise: jest.fn().mockResolvedValue({}),
  };
  return { DynamoDB: { DocumentClient: jest.fn(() => DocumentClient) } };
});

describe('createItem handler', () => {
  it('should create an item successfully', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        height: '172',
        mass: '77',
        eye_color: 'blue',
      },
    });

    const event: APIGatewayProxyEvent = {
      body: JSON.stringify({ nombre: 'Luke Skywalker', descripcion: 'Jedi', swapiPersonaId: 1 }),
    } as any;

    const response = await handler(event, {} as any, () => {}) as APIGatewayProxyResult;

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body).mensaje).toBe('Elemento creado con éxito');
  });

  it('should return an error if there is a problem', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));

    const event: APIGatewayProxyEvent = {
      body: JSON.stringify({ nombre: 'Luke Skywalker', descripcion: 'Jedi', swapiPersonaId: 1 }),
    } as any;

    const response = await handler(event, {} as any, () => {}) as APIGatewayProxyResult;

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).mensaje).toBe('Error al crear el elemento');
  });
});