import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-offers-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output()
  public query = new EventEmitter<string>();

  private setQuery(newQuery: string) {
    this.query.emit(newQuery);
  }
}
