import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
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
  @Output() changeTabs = new EventEmitter();
  public numFav: Observable<number>;
  public tab: string = 'home';

  constructor(
    private readonly favService: FavoriteService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.watchFavNumberChanges();
  }

  public choose(type: string) {
    this.tab = type
    this.changeTabs.emit(type);
  }

  private watchFavNumberChanges() {
    this.numFav = this.favService.getFavNumber();
  }
}
