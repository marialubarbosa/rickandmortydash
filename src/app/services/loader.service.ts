import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public loader = new BehaviorSubject<any>(undefined);
  constructor() {}
  setLoader(loader: any) {
    this.loader.next(loader);
  }

  getLoader() {
    return this.loader.asObservable();
  }
}
