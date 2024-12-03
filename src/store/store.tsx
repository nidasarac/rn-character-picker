import { create } from "zustand";

interface Character {
  id: number;
  name: string;
}

interface MultiSelectStore {
  selectedCharacters: Character[];
  addCharacter: (character: Character) => void;
  removeCharacter: (id: number) => void;
}

export const useMultiSelectStore = create<MultiSelectStore>((set) => ({
  selectedCharacters: [],
  addCharacter: (character) =>
    set((state) => ({
      selectedCharacters: [...state.selectedCharacters, character],
    })),
  removeCharacter: (id) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter((c) => c.id !== id),
    })),
}));
