// src/models/starWarsModel.ts

// Mapeo del modelo Planeta
export interface Planeta {
    clima: string; // Traducción de "climate"
    diametro: string; // Traducción de "diameter"
    gravedad: string; // Traducción de "gravity"
    nombre: string; // Traducción de "name"
    periodo_orbital: string; // Traducción de "orbital_period"
    poblacion: string; // Traducción de "population"
    residentes: string[]; // Traducción de "residents"
    periodo_rotacion: string; // Traducción de "rotation_period"
    agua_superficial: string; // Traducción de "surface_water"
    terreno: string; // Traducción de "terrain"
    url: string; // Mismo campo
  }
  
  // Mapeo del modelo Persona
  export interface Persona {
    nombre: string; // Traducción de "name"
    año_nacimiento: string; // Traducción de "birth_year"
    color_ojos: string; // Traducción de "eye_color"
    genero: string; // Traducción de "gender"
    color_pelo: string; // Traducción de "hair_color"
    altura: string; // Traducción de "height"
    masa: string; // Traducción de "mass"
    color_piel: string; // Traducción de "skin_color"
    mundo_natal: string; // Traducción de "homeworld"
    peliculas: string[]; // Traducción de "films"
    especies: string[]; // Traducción de "species"
    naves_estelares: string[]; // Traducción de "starships"
    vehiculos: string[]; // Traducción de "vehicles"
    url: string; // Mismo campo
  }
  