import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Caracteres } from 'src/app/interfaces/caracteres';
import { TabData } from 'src/app/interfaces/tab-data';

@Component({
  selector: 'ml-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() tabData! : TabData;
  @Input() caracteresData: Array<Caracteres> = [];
  @Input() isLoading: boolean = false;
  @Input() isEmpty: boolean = false;
  @Output() search = new EventEmitter();
  @Output() backToHome = new EventEmitter();
  @Output() favoriteIsEmpty = new EventEmitter();

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