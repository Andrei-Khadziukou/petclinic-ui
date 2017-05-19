import template from "./client.component.html";
import "./client.component.scss";

const Pages = {
  animalsSelection: 0,
  servicesSelection: 1,
  enteringName: 2,
  result: 3
};

export default {
  restrict: "E",
  bindings: {},
  template,
  controller: class {
    /* @ngInject */
    constructor($q, animalsService, ordersService) {
      Object.assign(this, {
        Pages,
        pages: {
          [Pages.animalsSelection]: "Animal",
          [Pages.servicesSelection]: "Services",
          [Pages.enteringName]: "Name",
          [Pages.result]: "Result"
        },
        currentPage: null,
        animals: null,
        services: null,
        clinics: null,
        _selectedAnimal: null,
        selectedServices: [],
        name: ""
      });

      Object.assign(this, {
        $q,
        animalsService,
        ordersService
      });

      this.fetchAnimals();
    }

    get pageIndexes() {
      return Object.keys(Pages)
        .map(key => Pages[key])
        .sort()
        .map(index => this.pages[index]);
    }

    get selectedAnimal() {
      return this._selectedAnimal;
    }

    queryServices(query) {
      query = query.toLowerCase();
      return this.services.filter(
        service => service.name.toLowerCase().indexOf(query) !== -1
      );
    }

    set selectedAnimal(animal) {
      this.selectedServices = [];
      this.services = null;
      this._selectedAnimal = animal;

      this.animalsService.getServices(animal).then(services => {
        this.services = services;
      });
    }

    get selectedAnimalName() {
      return this.animals.find(animal => animal.id === this.selectedAnimal)
        .name;
    }

    fetchAnimals() {
      this.animalsService.getData().then(animals => {
        this.animals = animals;
        this.selectedAnimal = this.animals[0].id;
        this.currentPage = Pages.animalsSelection;
      });
    }

    selectPage(page) {
      this.currentPage = page;
    }

    fetchClinics() {
      this.clinics = null;

      this.ordersService
        .getData(
          this.selectedAnimal,
          this.selectedServices.map(service => service.id)
        )
        .then(clinics => (this.clinics = clinics));
    }

    isAvailable(page) {
      if (page > 0 && !this.isAvailable(page - 1)) {
        return false;
      }

      switch (page) {
        case Pages.animalsSelection:
          return this.animals != null;

        case Pages.servicesSelection:
          return this.selectedAnimal != null && this.services != null;

        case Pages.enteringName:
          return this.selectedServices.length > 0;

        case Pages.result:
          return this.name.trim().length > 0 && this.clinics != null;

        default:
          return false;
      }
    }
  }
};
