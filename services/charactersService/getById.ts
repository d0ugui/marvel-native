import { CharactersProps } from "@/interfaces/characters";
import { httpClient } from "../httpClient";

export async function getById(characterId: string) {
  const {
    data: {
      data: { results: character },
    },
  } = await httpClient.get(`characters/${characterId}`);

  return character[0] as CharactersProps;
}
