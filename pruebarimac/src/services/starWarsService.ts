// src/services/starWarsService.ts
import axios from 'axios';
import { Planeta, Persona } from '../models/starWarsModel';

const API_URL = process.env.STAR_WARS_API_URL;

export const getPlaneta = async (id: number): Promise<Planeta> => {
  const url = `${API_URL}/planets/${id}`;
  const response = await axios.get(url, { timeout: 5000 });
  const data = response.data;

  // Mapeo de atributos al español
  const planeta: Planeta = {
    clima: data.climate,
    diametro: data.diameter,
    gravedad: data.gravity,
    nombre: data.name,
    periodo_orbital: data.orbital_period,
    poblacion: data.population,
    residentes: data.residents,
    periodo_rotacion: data.rotation_period,
    agua_superficial: data.surface_water,
    terreno: data.terrain,
    url: data.url,
  };

  return planeta;
};

export const getPersona = async (id: number): Promise<Persona> => {
  const url = `${API_URL}/people/${id}`;
  const response = await axios.get(url, { timeout: 5000 });
  const data = response.data;

  // Mapeo de atributos al español
  const persona: Persona = {
    nombre: data.name,
    año_nacimiento: data.birth_year,
    color_ojos: data.eye_color,
    genero: data.gender,
    color_pelo: data.hair_color,
    altura: data.height,
    masa: data.mass,
    color_piel: data.skin_color,
    mundo_natal: data.homeworld,
    peliculas: data.films,
    especies: data.species,
    naves_estelares: data.starships,
    vehiculos: data.vehicles,
    url: data.url,
  };

  return persona;
};
