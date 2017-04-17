import { Component } from '@angular/core';

import { Animal } from './shared/animal.model';
import { Service } from './shared/service.model';
import { Offers } from './shared/offers.model';
import { ToggleableItem } from './shared/toggleable-item.model';
import { AnimalsService } from './shared/animals.service';
import { ServicesService } from './shared/services.service';
import { OffersService } from './shared/offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  providers: [
    AnimalsService,
    ServicesService,
    OffersService
  ]
})
export class OffersComponent {
  public animals: Animal[];
  public services: Service[];
  public offers: Offers;

  public selectedAnimalID: number;

  public constructor(
    public animalsService: AnimalsService,
    public servicesService: ServicesService,
    public offersService: OffersService,
  ) {
    this.animals = animalsService.data;
    this.services = servicesService.data;
    this.offers = offersService.data;
  }

  public selectAnimalByID(id: number) {
    this.selectedAnimalID = id;
  }

  public get isAnimalSelected(): boolean {
    return this.selectedAnimalID != null;
  }

  public get selectedAnimalServices(): ToggleableItem[] {
    return this.services.map(service => {
      const isActive = this.offersService.isOffered(this.selectedAnimalID, service.id);
      return { ...service, isActive };
    });
  }

  public toggleService(id: number) {
    this.offersService.toggle(this.selectedAnimalID, id);
  }
}
