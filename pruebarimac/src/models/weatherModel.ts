export interface WeatherData {
    timestamp: string; // Timestamp en formato ISO
    temperature: number; // Temperatura en grados Celsius
    humidity: number; // Humedad relativa en porcentaje
    pressure: number; // Presión en hPa
    windSpeed: number; // Velocidad del viento en m/s
    windDirection: number; // Dirección del viento en grados
    precipitationProbability: number; // Probabilidad de precipitación en porcentaje
    precipitation: number; // Cantidad de precipitación en mm
  }
  
  export interface WeatherMetadata {
    modelRunUpdateTime: string; // Última hora de actualización del modelo
    latitude: number; // Latitud
    longitude: number; // Longitud
    height: number; // Altura sobre el nivel del mar
    timezone: string; // Zona horaria
  }
  