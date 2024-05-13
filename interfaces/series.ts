export interface CharactersSeriesProps {
  id: string;
  title: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
