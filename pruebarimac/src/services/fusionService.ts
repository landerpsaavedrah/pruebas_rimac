import { getPlaneta } from './starWarsService';
import { getWeatherData } from './meteoblueService';

export const obtenerDatosFusionados = async (idPlaneta: number, lat: number, lon: number) => {
  const planeta = await getPlaneta(idPlaneta);

  const { metadata, data } = await getWeatherData(lat, lon);

 
  return {
    planeta: {
      nombre: planeta.nombre,
      clima: planeta.clima,
      poblacion: planeta.poblacion,
      terreno: planeta.terreno,
    },
    meteorologia: {
      ubicacion: {
        latitud: metadata.latitude,
        longitud: metadata.longitude,
        altura: metadata.height,
        zonaHoraria: metadata.timezone,
      },
      pronostico: data[0], 
    },
  };
};
