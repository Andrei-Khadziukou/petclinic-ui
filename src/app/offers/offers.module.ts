import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search/search.component';
import { SelectableListComponent } from './selectable-list/selectable-list.component';
import { AnimalsListComponent } from './animals-list/animals-list.component';
import { ToggleableListComponent } from './toggleable-list/toggleable-list.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { OffersComponent } from './offers.component';
import { SearchService } from './shared/search.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    OffersComponent
  ],
  declarations: [
    SearchComponent,
    SelectableListComponent,
    AnimalsListComponent,
    ToggleableListComponent,
    ServicesListComponent,
    OffersComponent
  ],
  providers: [
    SearchService
  ]
})
export class OffersModule { }
