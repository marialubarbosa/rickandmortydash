import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConfig } from '../config/urlConfig';
import {  CaracteresResponse } from '../interfaces/caracteres-interface';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {

constructor(
  private readonly http:HttpClient
) { }

private url: string = urlConfig.rickMortyApi

getAllCaracters (page: string) : Observable<CaracteresResponse> {
  return this.http.get<CaracteresResponse>(`${this.url}/character?page=${page}`)
}


}
