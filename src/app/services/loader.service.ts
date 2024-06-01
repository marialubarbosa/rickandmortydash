import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public loader = new BehaviorSubject<boolean>(false);
  constructor() {}
  public setLoader(loader: boolean): void {
    this.loader.next(loader);
  }

  public getLoader(): Observable<boolean> {
    return this.loader.asObservable();
  }
}
