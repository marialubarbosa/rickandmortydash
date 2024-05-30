import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ml-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent implements OnInit {
@Input() numberItems: number = 10

public skeletons: Array<number> = []
  constructor() { }

  ngOnInit() {
    this.generateSkeletons(this.numberItems)
  }

  generateSkeletons (numberItems: number) {
    for(let i = 0; i < numberItems; i++){
      this.skeletons.push(i)
    }
  }


}
