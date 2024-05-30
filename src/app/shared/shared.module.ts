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

@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    ListComponent,
    EmptySearchComponent,
    SkeletonComponent,
  ],
  imports: [MatToolbarModule, MatIconModule, MatCardModule, CommonModule, FormsModule],
  exports: [
    HeaderComponent,
    CardComponent,
    ListComponent,
    EmptySearchComponent,
    SkeletonComponent,
  ],
})
export class SharedModule {}
