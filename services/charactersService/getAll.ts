import { CharactersProps } from "@/interfaces/characters";
import { httpClient } from "../httpClient";

export async function getAll(page: number) {
  const {
    data: {
      data: { results: characters },
    },
  } = await httpClient.get(`characters?offset=${page * 10}`);

  return characters as CharactersProps[];
}
