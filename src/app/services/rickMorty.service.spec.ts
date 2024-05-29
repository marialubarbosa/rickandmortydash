/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RickMortyService } from './rickMorty.service';

describe('Service: RickMorty', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RickMortyService]
    });
  });

  it('should ...', inject([RickMortyService], (service: RickMortyService) => {
    expect(service).toBeTruthy();
  }));
});
