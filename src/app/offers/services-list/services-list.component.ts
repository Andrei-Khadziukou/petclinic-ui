import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SearchService } from '../shared/search.service';
import { ToggleableItem } from '../shared/toggleable-item.model';

@Component({
  selector: 'app-offers-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent {
  public query = '';

  @Input()
  public services: ToggleableItem[];

  @Output()
  public onToggle = new EventEmitter<number>();

  constructor(
    private searcher: SearchService
  ) { }

  public toggle(id: number) {
    this.onToggle.emit(id);
  }

  public get visibleServices(): ToggleableItem[] {
    return this.searcher.searchByName(this.services, this.query);
  }
}
