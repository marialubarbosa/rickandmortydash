import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ListComponent } from './components/list/list.component';
import { EmptySearchComponent } from './components/empty-search/empty-search.component';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    ListComponent,
    EmptySearchComponent
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    CommonModule
  ],
  exports: [    HeaderComponent,
    CardComponent, ListComponent, EmptySearchComponent]
})
export class SharedModule { }
