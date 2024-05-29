import { Component, OnInit } from '@angular/core';
import { RickMortyService } from './services/rickMorty.service';
import { Caracteres, CaracteresResponse, Filters } from './interfaces/caracteres-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'rickandmortydash';
  public filter: Filters = {
    limit: '0',
    page: '1',
    search: ''
  }
  public caractersData: Array<Caracteres> = []

  constructor(private readonly rickMortyService: RickMortyService) {

  }
  ngOnInit(): void {
      this.getAll()
  }

  private getAll ():void {
    this.rickMortyService.getAllCaracters(this.filter.page).subscribe((res: CaracteresResponse) => {
      this.caractersData = res.results
    })
  }

}
