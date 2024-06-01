import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Characters } from '../interfaces/characters';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  public favorites = new BehaviorSubject<Array<Characters>>([]);
  public numberFavorites = new BehaviorSubject<number>(0);

  constructor() {}
  public setFavorite(character: Characters): void {
    const currentValue = this.favorites.getValue();

    let idx = currentValue.findIndex((i: Characters) => i.id === character.id);
    if (idx !== -1) {
      character.favorite = false;
      currentValue.splice(idx, 1);
    } else {
      character.favorite = true;
      currentValue.push(character);
    }

    this.favorites.next(currentValue);
  }

  public getFavorite(): Array<Characters> {
    return this.favorites.getValue();
  }

  public setFavNumber(numFav: number): void {
    this.numberFavorites.next(numFav);
  }

  getFavNumber(): Observable<number> {
    return this.numberFavorites.asObservable();
  }
}
