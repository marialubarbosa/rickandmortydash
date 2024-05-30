import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ml-empty-search',
  templateUrl: './empty-search.component.html',
  styleUrls: ['./empty-search.component.css']
})
export class EmptySearchComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() usingButton: boolean = false;
  @Output() backToHome = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

}
