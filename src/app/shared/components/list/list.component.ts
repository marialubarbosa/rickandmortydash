import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, first, fromEvent, map } from 'rxjs';
import { Caracteres } from 'src/app/interfaces/caracteres-interface';

@Component({
  selector: 'ml-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() title!: string;
  @Input() hasASearch: boolean = true;
  @Input() caracteresData: Array<Caracteres> = [];
  @Input() isLoading: boolean = false;
  @Input() isEmpty: boolean = false;
  @Output() search = new EventEmitter();

  public time: any = null;
  public inputSearch: string = '';

  constructor() {}

  ngOnInit() {
    
  }

  onSearch(event: string) {
    clearTimeout(this.time);
    this.time = setTimeout(() => {
      this.search.emit(event)
    } , 1000)
  }
}
