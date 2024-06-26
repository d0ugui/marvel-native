export interface CharactersProps {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  series: {
    items: {
      resourceURI: string;
      name: string;
    }[];
  };
}
