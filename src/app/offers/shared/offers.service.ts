import { Injectable } from '@angular/core';

import { Offers } from './offers.model';

@Injectable()
export class OffersService {
  public data: Offers = {};
  public isFetched = false;

  public constructor() {
    setTimeout(() => {
      this.data[0] = [0, 1];
      this.data[1] = [1, 2];
      this.data[2] = [0, 1, 2];
      this.isFetched = true;
    }, 1500);
  }

  public add(animalID: number, serviceID: number) {
    this.data[animalID].push(serviceID);
  }

  public remove(animalID: number, serviceID: number) {
    this.data[animalID] = this.data[animalID]
      .filter(offeredID => offeredID !== serviceID);
  }

  public isOffered(animalID: number, serviceID: number): boolean {
    return this.data[animalID].indexOf(serviceID) !== -1;
  }

  public toggle(animalID: number, serviceID: number) {
    if (this.isOffered(animalID, serviceID)) {
      this.remove(animalID, serviceID);
    } else {
      this.add(animalID, serviceID);
    }
  }
}

