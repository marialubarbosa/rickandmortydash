import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { RickMortyService } from './services/rickMorty.service';
import {
  Caracteres,
  CaracteresResponse,
  Filters,
} from './interfaces/caracteres';
import { Subscription } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { TabData } from './interfaces/tab-data';
import { FavoriteService } from './services/favorite.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rickandmortydash';
  public isEmpty: boolean = false;
  public filter: Filters = {
    limit: '0',
    page: '1',
    search: '',
  };
  public caractersData: Array<Caracteres> = [];
  public caractersFavorite: Array<Caracteres> = [];
  public subscription$: Subscription = new Subscription();
  public isLoading: boolean = false;
  public tabData: TabData;

  constructor(
    private readonly rickMortyService: RickMortyService,
    private readonly loaderService: LoaderService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly favoritesService: FavoriteService
  ) {}
  ngOnInit(): void {
    this.whatchForLoaderChanges();
    this.setTab('home');
  }

  public observeLastCard(cardObserver: any) {
    const lastCard = document.getElementById('param');
    cardObserver.observe(lastCard);
  }

  public async pagination() {
    const observer = new IntersectionObserver((e) => {
      if (e.some((a) => a.isIntersecting)) {
        observer.disconnect();
        this.filter.page = (parseInt(this.filter.page) + 1).toString();
        this.getAll();
      }
    });
    this.observeLastCard(observer);
  }

  private getAll(): void {
    this.caractersData = [];
    this.rickMortyService
      .getAllCaracters(this.filter)
      .pipe()
      .subscribe({
        next: (res: CaracteresResponse) => {
          res.results.map((item) => {
            const isFavorite = this.caractersFavorite.findIndex(
              (fav: Caracteres) => fav.id === item.id
            );
            item = { ...item, favorite: isFavorite !== -1 ? true : false };
            if (!item.image)
              item.image = '../../../../assets/images/no_image.png';
            this.caractersData.push(item);
          });
          if (res.info.next !== null) this.pagination();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.isEmpty = true;
          }
        },
      });
  }

  whatchForLoaderChanges() {
    this.subscription$.add(
      this.loaderService.getLoader().subscribe((loader) => {
        this.isLoading = loader;
        this.cdRef.detectChanges();
      })
    );
  }

  getFavorites() {
    this.caractersFavorite = this.favoritesService.getFavorite();
    this.isEmpty = this.caractersFavorite.length === 0 ? true : false;
  }

  searchCaracters(event: string) {
    this.filter.search = event;
    this.filter.page = '1';
    this.caractersData = [];
    this.getAll();
  }

  setTab(tab: string) {
    this.tabData = {
      title: tab === 'home' ? 'Início' : 'Favoritos',
      hasASearch: tab === 'home' ? true : false,
      emptyHasAButton: tab === 'home' ? false : true,
      emptySubtitle:
        tab === 'home'
          ? 'Tente realizar uma nova busca.'
          : 'Volte à página inicial e escolha os melhores para você.',
      emptyTitle:
        tab === 'home'
          ? 'Nada foi encontrado'
          : 'Parece que você ainda não tem favoritos',
      showReferenceDiv: tab === 'home' ? true : false,
    };
    tab === 'home'
      ? ((this.isEmpty = false), this.getAll())
      : this.getFavorites();
  }
}
