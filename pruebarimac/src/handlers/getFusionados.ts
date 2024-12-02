import { APIGatewayProxyHandler } from 'aws-lambda';
import { obtenerDatosFusionados } from '../services/fusionService';

export const handler: APIGatewayProxyHandler = async (event) => {
  const { idPlaneta, lat, lon } = event.queryStringParameters || {};

  if (!idPlaneta || !lat || !lon) {
    return {
      statusCode: 400,
      body: JSON.stringify({ mensaje: 'Faltan parámetros requeridos (idPlaneta, lat, lon).' }),
    };
  }

  try {
    const datos = await obtenerDatosFusionados(Number(idPlaneta), Number(lat), Number(lon));
    return {
      statusCode: 200,
      body: JSON.stringify({ datos }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ mensaje: 'Error al procesar los datos.', error: error.message }),
    };
  }
};
