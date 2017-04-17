import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {
  public searchByName(items, query) {
    const loweredQuery = query.toLowerCase();

    return items.filter(item => {
      const name = item.name.toLowerCase();

      return name.indexOf(loweredQuery) !== -1;
    });
  }
}
