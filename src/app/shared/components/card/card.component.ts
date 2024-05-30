import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ml-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() image!: string;
  @Input() isFavorite: boolean = false;
  public notLoaded: boolean = true 

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.notLoaded = false
    }, 2000);
  }

}
