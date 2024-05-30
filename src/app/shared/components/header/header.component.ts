import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ml-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public choose(type: string) {
    const home = document.getElementsByClassName('navbar_selector_home')
    const fav = document.getElementsByClassName('navbar_selector_fav')
    if (type === 'home') {
      home[0].classList.add("active");
      fav[0].classList.remove("active")
    } else {
      fav[0].classList.add("active");
      home[0].classList.remove("active")
    }
  }

}
