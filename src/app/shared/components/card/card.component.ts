import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Caracteres } from 'src/app/interfaces/caracteres';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'ml-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() caracter: Caracteres;
  @Output() favoriteIsEmpty: EventEmitter<CustomEvent> =
    new EventEmitter<CustomEvent>();

  public subscription$: Subscription = new Subscription();

  constructor(private readonly favoritesService: FavoriteService) {}

  ngOnInit() {}
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public setFavorite(caracter: Caracteres): void {
    this.subscription$.add(this.favoritesService.setFavorite(caracter));
    if (this.favoritesService.getFavorite().length === 0) {
      this.favoriteIsEmpty.emit();
    }

    this.favoritesService.setFavNumber(
      this.favoritesService.getFavorite().length
    );
  }
}
