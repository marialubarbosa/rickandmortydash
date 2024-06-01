import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'ml-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() changeTabs: EventEmitter<string> = new EventEmitter<string>();
  @Input() tab: string = 'home';

  public numFav$: Observable<number>;

  constructor(private readonly favService: FavoriteService) {}

  ngOnInit() {
    this.watchFavNumberChanges();
  }

  public choose(type: string): void {
    this.tab = type;
    this.changeTabs.emit(this.tab);
  }

  private watchFavNumberChanges(): void {
    this.numFav$ = this.favService.getFavNumber();
  }
}
