export interface Caracteres {
    name: string;
    id: number;
    image: string;
    gender: string;
    species: string;
}

export interface Filters {
    page: string;
    limit: string;
    search: string;
}

export interface CaracteresResponse {
    results: Array<Caracteres>,

}