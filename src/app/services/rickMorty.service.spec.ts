import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { RickMortyService } from './rickMorty.service';
import { CaracteresResponse, Filters } from '../interfaces/caracteres';
import { urlConfig } from '../config/urlConfig';

describe('RickMortyService - getAllCaracters method', () => {
  let service: RickMortyService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RickMortyService]
    });

    service = TestBed.inject(RickMortyService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all caracters', () => {
    const filter: Filters = { page: '1', search: 'Rick', limit: '' };
    const mockResponse: CaracteresResponse = {
      info: { next: ''},
      results: [{
        favorite: false,
        gender: '',
        id: 1,
        image: '',
        name: '',
        species: '',
      }]
    };

    service.getAllCaracters(filter).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${urlConfig.rickMortyApi}/character?page=1&name=Rick`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); 
  });
});
