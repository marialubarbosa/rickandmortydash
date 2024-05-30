import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RickMortyService } from './services/rickMorty.service';
import {
  Caracteres,
  CaracteresResponse,
  Filters,
} from './interfaces/caracteres-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rickandmortydash';
  public filter: Filters = {
    limit: '0',
    page: '1',
    search: '',
  };
  public caractersData: Array<Caracteres> = [];

  constructor(private readonly rickMortyService: RickMortyService) {}
  ngOnInit(): void {
    this.getAll();

  }
  // ngAfterViewInit(): void {
  //   this.pagination()

    
  // }

  public observeLastCard (cardObserver: any) {
    const lastCard = document.getElementById('param')
    cardObserver.observe(lastCard)
  }

  public async pagination() {
    const observer = new IntersectionObserver((e) => {
      if (e.some((a) => a.isIntersecting)) {
        observer.disconnect()
        this.filter.page = (parseInt(this.filter.page) + 1).toString();
        this.getAll()
      }
    })
    this.observeLastCard(observer)
  }

  private getAll(): void {
    this.rickMortyService
      .getAllCaracters(this.filter.page)
      .subscribe((res: CaracteresResponse) => {
          res.results.map((item) => {
            if (!item.image) item.image = "../../../../assets/images/no_image.png";
            this.caractersData.push(item);
          });
          this.pagination()
      });
  }
}
