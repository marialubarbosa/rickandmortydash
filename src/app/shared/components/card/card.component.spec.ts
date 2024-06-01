/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Characters } from 'src/app/interfaces/characters';
import { FavoriteService } from 'src/app/services/favorite.service';
import { of } from 'rxjs';
const mockCharacters = {
  favorite: false,
  gender: 'etste',
  id: 1,
  image: '',
  name: '',
  species: '',
};
class MockFavoriteService {
  getFavorite(): Array<Characters> {
    return [];
  }
  setFavorite() {}
  setFavNumber() {}
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let favoriteService: FavoriteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [MatCardModule, MatTooltipModule],
      providers: [{ provide: FavoriteService, useClass: MockFavoriteService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    favoriteService = TestBed.inject(FavoriteService);
    component = fixture.componentInstance;
    component.character = mockCharacters
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set favortie character', () => {
    const spySetFavorite = spyOn(favoriteService, 'setFavorite');
    const spyGetFavorites = spyOn(favoriteService, 'getFavorite').and.returnValue([
      mockCharacters,
    ]);
    const spyFavNumber = spyOn(favoriteService, 'setFavNumber');
    component.setFavorite(component.character);
    expect(spySetFavorite).toHaveBeenCalledWith(mockCharacters);
    expect(spyGetFavorites).toHaveBeenCalled();
    expect(spyFavNumber).toHaveBeenCalledWith(1);
  });

  it('should emit isEmpty event', () => {
    const spyGet = spyOn(favoriteService, 'getFavorite').and.returnValue([]);
    const spy = spyOn(component.favoriteIsEmpty, 'emit');
    const spyFavNumber = spyOn(favoriteService, 'setFavNumber');
    component.setFavorite(mockCharacters);

    expect(spy).toHaveBeenCalled();
    expect(spyGet).toHaveBeenCalled();
    expect(spyFavNumber).toHaveBeenCalledOnceWith(0)

  })
});
