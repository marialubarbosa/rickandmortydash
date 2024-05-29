import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ml-empty-search',
  templateUrl: './empty-search.component.html',
  styleUrls: ['./empty-search.component.css']
})
export class EmptySearchComponent implements OnInit {

  @Input() title: string = 'Nada foi encontrado'
  @Input() subtitle: string = 'Tente realizar uma nova busca.'
  @Input() usingButton: boolean = false


  constructor() { }

  ngOnInit() {
  }

}
