import { delay } from 'rxjs/operator/delay';
import { Injectable } from '@angular/core';

import { Animal } from './animal.model';

@Injectable()
export class AnimalsService {
  public data: Animal[] = [];
  public isFetched = false;

  public constructor() {
    setTimeout(() => {
      this.data.push(new Animal(0, 'Dog'));
      this.data.push(new Animal(1, 'Cat'));
      this.data.push(new Animal(2, 'Parrot'));
      this.isFetched = true;
    }, 1000);
  }
}
