import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { nombre, descripcion, swapiPersonaId } = JSON.parse(event.body ?? '');

    // Solicitar datos de la API de Star Wars
    const response = await axios.get(`${process.env.STAR_WARS_API_URL}/people/${swapiPersonaId}`);
    const personaje = response.data;

    // Crear el elemento con los datos combinados
    const item = {
      id: uuidv4(),
      nombre,
      descripcion,
      altura: personaje.height, // Atributos de la API SWAPI
      masa: personaje.mass,
      color_ojos: personaje.eye_color,
    };

    // Almacenar el elemento en DynamoDB
    await dynamoDb.put({
      TableName: process.env.DYNAMODB_TABLE as string,
      Item: item,
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ mensaje: 'Elemento creado con éxito', item }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ mensaje: 'Error al crear el elemento', error: (error instanceof Error) ? error.message : 'Unknown error' }),
    };
  }
};