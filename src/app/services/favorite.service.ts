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
  setFavorite(caracter: Caracteres) {
    debugger
    const currentValue = this.favorites.getValue();
    
    let index;
    currentValue.forEach((caract, i) => {
      if (caract.id === caracter.id) {
        index = i 
        return
      }
    })
    if (index || index === 0) {
      caracter.favorite = false
      currentValue.splice(index, 1) 
      this.favorites.next(currentValue);
    } else {
      caracter.favorite = true
      let favArr: any = [...this.favorites.getValue(), caracter];
      this.favorites.next(favArr);
    }
  }

  getFavorite() {
    // return this.favorites.asObservable();
    return this.favorites.getValue()
  }

  setFavNumber(numFav: number) {
    this.numberFavorites.next(numFav)
  }

  getFavNumber(): Observable<number> {
    return this.numberFavorites.asObservable();
  }
}
