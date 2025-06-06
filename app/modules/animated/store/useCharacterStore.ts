import { create } from 'zustand';
import { Character } from '@/types/data';

interface CharacterStore {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  addCharacters: (characters: Character[]) => void;
  clearCharacters: () => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  characters: [],
  setCharacters: (characters) => set({ characters }),
  addCharacters: (newCharacters) => 
    set((state) => ({ 
      characters: [...state.characters, ...newCharacters] 
    })),
  clearCharacters: () => set({ characters: [] }),
}));

