import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
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
export class AppComponent implements OnInit, OnDestroy {
  public isEmpty: boolean;
  public filter: Filters;
  public caractersData: Array<Caracteres> = [];
  public caractersFavorite: Array<Caracteres> = [];
  public subscription$: Subscription = new Subscription();
  public isLoading: boolean;
  public tabData: TabData;

  constructor(
    private readonly rickMortyService: RickMortyService,
    private readonly loaderService: LoaderService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly favoritesService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.init();
    this.whatchForLoaderChanges();
    this.setTab('home');
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private whatchForLoaderChanges(): void {
    this.subscription$.add(
      this.loaderService.getLoader().subscribe((loader) => {
        this.isLoading = loader;
        this.cdRef.detectChanges();
      })
    );
  }

  private init() {
    this.filter = {
      limit: '0',
      page: '1',
      search: '',
    };
  }

  private observeLastCard(cardObserver: any): void {
    const lastCard = document.getElementById('param');
    cardObserver.observe(lastCard);
  }

  private getAll(): void {
    this.rickMortyService
      .getAllCaracters(this.filter)
      .pipe()
      .subscribe({
        next: (res: CaracteresResponse) => {
          this.isEmpty = false;
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

  private pagination(): void {
    const observer = new IntersectionObserver((e) => {
      if (e.some((a) => a.isIntersecting)) {
        observer.disconnect();
        this.filter.page = (parseInt(this.filter.page) + 1).toString();
        this.getAll();
      }
    });
    this.observeLastCard(observer);
  }

  private getFavorites(): void {
    this.caractersFavorite = this.favoritesService.getFavorite();
    this.isEmpty = this.caractersFavorite.length === 0 ? true : false;
  }

  public searchCaracters(event: string): void {
    this.filter.search = event;
    this.filter.page = '1';
    this.getAll();
  }

  public setTab(tab: string): void {
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
