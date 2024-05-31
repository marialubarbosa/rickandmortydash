import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Caracteres } from '../interfaces/caracteres';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  public favorites = new BehaviorSubject<Array<Caracteres>>([]);
  public numberFavorites = new BehaviorSubject<number>(0);

  constructor() {}
  public setFavorite(caracter: Caracteres): void {
    const currentValue = this.favorites.getValue();

    let idx = currentValue.findIndex((i: Caracteres) => i.id === caracter.id);
    if (idx !== -1) {
      caracter.favorite = false;
      currentValue.splice(idx, 1);
    } else {
      caracter.favorite = true;
      currentValue.push(caracter);
    }

    this.favorites.next(currentValue);
  }

  public getFavorite(): Array<Caracteres> {
    return this.favorites.getValue();
  }

  public setFavNumber(numFav: number): void {
    this.numberFavorites.next(numFav);
  }

  getFavNumber(): Observable<number> {
    return this.numberFavorites.asObservable();
  }
}
