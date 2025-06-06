import { ApiResponse } from "@/types";
import { Character } from "@/types/data";

const API_BASE_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = async (page: number = 1): Promise<ApiResponse<Character>> => {
  try {
    const url = page === 1 ? API_BASE_URL : `${API_BASE_URL}?page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la red: ${response.statusText}`);
    }

    const data: ApiResponse<Character> = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
    throw error;
  }
};