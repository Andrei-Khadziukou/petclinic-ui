import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SelectableItem } from '../shared/selectable-item.model';

@Component({
  selector: 'app-offers-selectable-list',
  templateUrl: './selectable-list.component.html',
  styleUrls: ['./selectable-list.component.css']
})
export class SelectableListComponent {
  @Input()
  public items: SelectableItem[];

  @Input()
  public selectedID: number;

  @Output()
  public onSelect = new EventEmitter<number>();

  public select(item: SelectableItem) {
    this.onSelect.emit(item.id);
  }

  public isSelected(item): boolean {
    return item.id === this.selectedID;
  }
}
