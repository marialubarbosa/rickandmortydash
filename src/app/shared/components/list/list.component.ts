import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Characters } from 'src/app/interfaces/characters';
import { TabData } from 'src/app/interfaces/tab-data';

@Component({
  selector: 'ml-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() tabData!: TabData;
  @Input() charactersData: Array<Characters> = [];
  @Input() isLoading: boolean = false;
  @Input() isEmpty: boolean = false;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() backToHome: EventEmitter<CustomEvent> = new EventEmitter<CustomEvent>();
  @Output() favoriteIsEmpty: EventEmitter<CustomEvent> = new EventEmitter<CustomEvent>();

  public time: any = null;
  public inputSearch: string = '';

  constructor() {}

  ngOnInit() {}

  public onSearch(event: string): void {
    clearTimeout(this.time);
    this.time = setTimeout(() => {
      this.search.emit(event);
    }, 1000);
  }
}
