import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';
import { Caracteres, CaracteresResponse } from './interfaces/caracteres';
import { Observable, of, throwError } from 'rxjs';
import { RickMortyService } from './services/rickMorty.service';
import { FavoriteService } from './services/favorite.service';

const mockCharacters: Caracteres = {
  favorite: false,
  gender: '',
  id: 1,
  image: '',
  name: '',
  species: '',
};

const mockResponseCharacters: CaracteresResponse = {
  info: {
    next: '',
  },
  results: [mockCharacters],
};

class MockRickMortyService {
  getAllCaracters(): Observable<CaracteresResponse> {
    return of(mockResponseCharacters);
  }
}

class MockFavoriteService {
  getFavorite (): Array<Caracteres> {
    return [ mockCharacters]
  }

  getFavNumber (): Observable<Number> {
    return of (0)
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let rickMortyService: RickMortyService;
  let favoriteService: FavoriteService
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        SharedModule,
      ],
      providers: [
        {
          provide: RickMortyService,
          useClass: MockRickMortyService,
        },
        {
          provide: FavoriteService,
          useClass: MockFavoriteService
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    rickMortyService = TestBed.inject(RickMortyService);
    favoriteService = TestBed.inject(FavoriteService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call observerCallback when IntersectionObserver triggers', () => {
    spyOn<any>(component, 'getAll');
    spyOn<any>(component.observer, 'disconnect');
    component.filter = { page: '1', limit: '', search: '' };
    const entries = [{ isIntersecting: true }] as IntersectionObserverEntry[];
    const divSentinell: HTMLElement = document.createElement('div');
    divSentinell.setAttribute('id', 'param');

    (component as any).observeLastCard(divSentinell);
    (component as any).observerCallback(entries);

    expect(component.observer.disconnect).toHaveBeenCalled();
    expect(component.filter.page).toBe('2');
    expect((component as any).getAll).toHaveBeenCalled();
  });

  it('should set favorite as true', () => {
    component.caractersData = [];
    component.caractersFavorite.push(mockCharacters);

    (component as any).getAll();

    expect(component.caractersData.length).not.toBe(0);
    expect(component.caractersData[0].favorite).toBeTrue();
  });

  it('should favorite as false', () => {
    component.caractersData = [];

    (component as any).getAll();

    expect(component.caractersData.length).not.toBe(0);
    expect(component.caractersData[0].favorite).toBeFalse();
  });

  it('should stop observer sentinell component', () => {
    const response: CaracteresResponse = {
      info: {
        next: null,
      },
      results: [],
    };
    spyOn<any>(component.observer, 'disconnect');

    spyOn(rickMortyService, 'getAllCaracters').and.returnValues(of(response));

    (component as any).getAll();

    expect(component.observer.disconnect).toHaveBeenCalled();
  });

  it('should have 404 error', () => {
    spyOn(rickMortyService, 'getAllCaracters').and.callFake(() => {
      return throwError({
        error: {
          status: 404,
        },
      });
    });

    (component as any).getAll();

    expect(component.isEmpty).toBeTrue();
  });

  it('should favorite be empty', () => {
    spyOn(favoriteService, 'getFavorite').and.returnValue([])
    component.setTab('fav')
    expect(component.isEmpty).toBeTrue()
  })

  it('should favorite be full', () => {
    component.setTab('fav')
    expect(component.isEmpty).toBeFalse()
  })

  it('', () => {
    spyOn<any>(component, 'getAll');
    component.searchCaracters('summer')
    expect(component.filter.search).toEqual('summer')
    expect((component as any).getAll).toHaveBeenCalled();
  })
});
