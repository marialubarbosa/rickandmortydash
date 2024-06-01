import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Characters } from 'src/app/interfaces/characters';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'ml-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() character: Characters;
  @Output() favoriteIsEmpty: EventEmitter<CustomEvent> =
    new EventEmitter<CustomEvent>();

  public subscription$: Subscription = new Subscription();
  public defaultImage: string = '../../../../assets/images/no_image.png'

  constructor(private readonly favoritesService: FavoriteService) {}

  ngOnInit() {}
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public setFavorite(character: Characters): void {
    this.subscription$.add(this.favoritesService.setFavorite(character));
    if (this.favoritesService.getFavorite().length === 0) {
      this.favoriteIsEmpty.emit();
    }

    this.favoritesService.setFavNumber(
      this.favoritesService.getFavorite().length
    );
  }
}
