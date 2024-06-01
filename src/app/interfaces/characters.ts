export interface Characters {
  name: string;
  id: number;
  image: string;
  gender: string;
  species: string;
  favorite: boolean;
}

export interface Filters {
  page: string;
  limit: string;
  search: string;
}

export interface CharactersResponse {
  info: {
    next: string | null;
  };
  results: Array<Characters>;
}
