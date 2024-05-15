import { CharactersProps } from "@/interfaces/characters";
import { httpClient } from "../httpClient";

export async function getByName(characterName: string) {
  const {
    data: {
      data: { results: characters },
    },
  } = await httpClient.get(`characters?name=${characterName}`);

  return characters as CharactersProps[];
}
