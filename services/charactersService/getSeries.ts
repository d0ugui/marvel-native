import { CharactersSeriesProps } from "@/interfaces/series";
import { httpClient } from "../httpClient";

export async function getSeries(characterId: string) {
  const {
    data: {
      data: { results: series },
    },
  } = await httpClient.get(`characters/${characterId}/series`);

  return series as CharactersSeriesProps[];
}
