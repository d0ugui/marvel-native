import { CharactersProps } from "@/interfaces/characters";
import { httpClient } from "../httpClient";

export async function getAll() {
  const {
    data: {
      data: { results: characters },
    },
  } = await httpClient.get("characters");

  return characters as CharactersProps[];
}
