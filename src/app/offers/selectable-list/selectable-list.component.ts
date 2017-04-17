import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-offers-selectable-list',
  templateUrl: './selectable-list.component.html',
  styleUrls: ['./selectable-list.component.css']
})
export class SelectableListComponent implements OnInit {
  @Input()
  public items;

  @Input()
  public query = '';

  @Output()
  public onSelect = new EventEmitter<number>();

  public activeID: number;

  private isItemVisible(item) {
    return item.name.indexOf(this.query) !== -1;
  }

  public get visibleItems() {
    return this.items.filter(item => this.isItemVisible(item));
  }

  public setActive(item) {
    this.activeID = item.id;
    this.onSelect.emit(this.activeID);
  }

  public isActive(item): boolean {
    return item.id === this.activeID;
  }

  ngOnInit() { }
}
