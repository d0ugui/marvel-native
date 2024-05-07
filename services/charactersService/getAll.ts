import { CharactersProps } from "@/interfaces/characters";
import { httpClient } from "../httpClient";

export async function getAll() {
  const {
    data: {
      data: { results },
    },
  } = await httpClient.get("characters");

  return results as CharactersProps[];
}
