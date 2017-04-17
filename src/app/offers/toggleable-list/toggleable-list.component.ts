import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ToggleableItem } from '../shared/toggleable-item.model';

@Component({
  selector: 'app-offers-toggleable-list',
  templateUrl: './toggleable-list.component.html',
  styleUrls: ['./toggleable-list.component.css']
})
export class ToggleableListComponent {
  @Input()
  public items: ToggleableItem[];

  @Output()
  public onToggle = new EventEmitter<number>();

  public toggle(item: ToggleableItem) {
    this.onToggle.emit(item.id);
  }
}
