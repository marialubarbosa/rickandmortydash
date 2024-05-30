import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { RickMortyService } from './services/rickMorty.service';
import {
  Caracteres,
  CaracteresResponse,
  Filters,
} from './interfaces/caracteres-interface';
import { Subscription } from 'rxjs';
import { LoaderService } from './services/loader.service';

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
  public subscription$: Subscription = new Subscription();
  public isLoading: boolean = false;

  constructor(
    private readonly rickMortyService: RickMortyService,
    private readonly loaderService: LoaderService,
    private readonly cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.whatchForLoaderChanges();
    this.getAll();
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
    this.rickMortyService
      .getAllCaracters(this.filter)
      .subscribe((res: CaracteresResponse) => {
        this.isEmpty = false;
        res.results.map((item) => {
          if (!item.image)
            item.image = '../../../../assets/images/no_image.png';
          this.caractersData.push(item);
        });

        if (res.info.next !== null) this.pagination();
      }, () => {
        this.isEmpty = true
      })
  }

  whatchForLoaderChanges() {
    this.subscription$.add(
      this.loaderService.getLoader().subscribe((loader) => {
        this.isLoading = loader;
        this.cdRef.detectChanges();
      })
    );
  }

  searchCaracters(event: string) {
    this.filter.search = event;
    this.filter.page = '1';
    this.caractersData = [];
    this.getAll();
  }
}
