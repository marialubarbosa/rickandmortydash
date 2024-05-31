import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ListComponent } from './components/list/list.component';
import { EmptySearchComponent } from './components/empty-search/empty-search.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

const COMPONENTS = [
  HeaderComponent,
  CardComponent,
  ListComponent,
  EmptySearchComponent,
  SkeletonComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    MatTooltipModule,
  ],
  exports: [COMPONENTS],
})
export class SharedModule {}
