import { CharactersProps } from "@/interfaces/characters";
import { create } from "zustand";

type State = {
  favoriteCharacters: CharactersProps[];
};

type Action = {
  add: (character: CharactersProps) => void;
  remove: (characterId: number) => void;
};

export const useFavoriteStore = create<State & Action>((set) => ({
  favoriteCharacters: [],
  add: (character: CharactersProps) =>
    set((state) => ({
      favoriteCharacters: [...state.favoriteCharacters, character],
    })),
  remove: (characterId) =>
    set((state) => ({
      favoriteCharacters: state.favoriteCharacters.filter(
        (character) => character.id !== characterId
      ),
    })),
}));
