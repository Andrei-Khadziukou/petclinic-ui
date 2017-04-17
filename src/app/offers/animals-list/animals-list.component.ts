import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SearchService } from '../shared/search.service';
import { Animal } from '../shared/animal.model';

@Component({
  selector: 'app-offers-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.css']
})
export class AnimalsListComponent {
  public query = '';

  @Input()
  public animals: Animal;

  @Input()
  public selectedID: number;

  @Output()
  public onSelect = new EventEmitter<number>();

  constructor(
    private searcher: SearchService
  ) { }

  public select(id: number) {
    this.onSelect.emit(id);
  }

  public get visibleAnimals(): Animal[] {
    return this.searcher.searchByName(this.animals, this.query);
  }
}
