/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FavoriteService } from './favorite.service';
import { Characters } from '../interfaces/characters';
import { of } from 'rxjs';

const caracterList: Array<Characters> = [
  {
    favorite: false,
    gender: '',
    id: 1,
    image: '',
    name: '',
    species: '',
  },
  {
    favorite: false,
    gender: '',
    id: 2,
    image: '',
    name: '',
    species: '',
  }
]

describe('Service: Favorite', () => {
  let service: FavoriteService
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteService]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(FavoriteService)
    
  })

  it('should ...',() => {
    expect(service).toBeTruthy();
  });

  it('should set a new favorite', () => {
    const listCaractere = [
      {
        favorite: false,
        gender: '',
        id: 1,
        image: '',
        name: '',
        species: '',
      },
      {
        favorite: false,
        gender: '',
        id: 2,
        image: '',
        name: '',
        species: '',
      }
    ]
    const oneCaractere =       {
      favorite: false,
      gender: '',
      id: 5,
      image: '',
      name: '',
      species: '',
    }
    spyOn(service.favorites, 'getValue').and.returnValue(listCaractere);
    service.setFavorite(oneCaractere)
    expect(service.favorites.getValue().length).toEqual(3)
  })

  it('should remove a favorite', () => {
    const listCaractere = [
      {
        favorite: false,
        gender: '',
        id: 1,
        image: '',
        name: '',
        species: '',
      },
      {
        favorite: false,
        gender: '',
        id: 2,
        image: '',
        name: '',
        species: '',
      }
    ]
    const oneCaractere =       {
      favorite: false,
      gender: '',
      id: 1,
      image: '',
      name: '',
      species: '',
    }
    spyOn(service.favorites, 'getValue').and.returnValue(listCaractere);
    service.setFavorite(oneCaractere)
    expect(service.favorites.getValue().length).toEqual(1)
  })

  it('should return an array', () => {
    const spy = spyOn(service.favorites, 'getValue').and.returnValue(caracterList);
    service.getFavorite()
    expect(spy).toHaveBeenCalled()
  })

  it('should add a new numberFavorite', () => {
    service.setFavNumber(5);
    expect(service.numberFavorites.getValue()).toEqual(5)
  })

  it('should get a numberFavorite', () => {
    spyOn(service.numberFavorites, 'getValue').and.returnValue(0)
    service.getFavNumber().subscribe((n) => {expect(n).toEqual(0)})
  })

});
