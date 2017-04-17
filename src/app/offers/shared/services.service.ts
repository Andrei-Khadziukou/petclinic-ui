import { delay } from 'rxjs/operator/delay';
import { Injectable } from '@angular/core';

import { Service } from './service.model';

@Injectable()
export class ServicesService {
  public data: Service[] = [];
  public isFetched = false;

  public constructor() {
    setTimeout(() => {
      this.data.push(new Service(0, 'First'));
      this.data.push(new Service(1, 'Second'));
      this.data.push(new Service(2, 'Third'));
      this.isFetched = true;
    }, 2000);
  }
}
