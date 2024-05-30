import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  public isEmpty: boolean = false;

  constructor() {}

  ngOnInit() {
    
  }

}
