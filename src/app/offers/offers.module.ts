import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search/search.component';
import { SelectableListComponent } from './selectable-list/selectable-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchComponent,
    SelectableListComponent
  ],
  declarations: [
    SearchComponent,
    SelectableListComponent
  ]
})
export class OffersModule { }
