import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConfig } from '../config/urlConfig';
import { CharactersResponse, Filters } from '../interfaces/characters';

@Injectable({
  providedIn: 'root',
})
export class RickMortyService {
  constructor(private readonly http: HttpClient) {}

  private url: string = urlConfig.rickMortyApi;

  getAllCaracters(filter: Filters): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(
      `${this.url}/character?page=${filter.page}&name=${filter.search}`
    );
  }
}
