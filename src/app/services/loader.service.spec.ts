/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('Service: Loader', () => {
  let service : LoaderService
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(LoaderService)
  })

  it('should ...', inject([LoaderService], (service: LoaderService) => {
    expect(service).toBeTruthy();
  }));

  it('should set a loader', () => {
    service.setLoader(true);
    expect(service.loader.getValue()).toBeTrue()
  })

  it('should get a loader', () => {
    spyOn(service.loader, 'getValue').and.returnValue(false)
    service.getLoader().subscribe((n) => {expect(n).toBeFalse()})
  })
});
