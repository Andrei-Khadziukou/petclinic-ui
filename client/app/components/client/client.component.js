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
    constructor($q, animalsService, servicesService) {
      Object.assign(this, {
        Pages,
        pages: {
          [Pages.animalsSelection]: "Select animal",
          [Pages.servicesSelection]: "Select services",
          [Pages.enteringName]: "Enter your name",
          [Pages.result]: "View result"
        },
        currentPage: null,
        animals: null,
        services: null,
        _selectedAnimal: null,
        selectedServices: [],
        name: ""
      });

      Object.assign(this, {
        $q,
        animalsService,
        servicesService
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

    set selectedAnimal(animal) {
      this.selectedServices = [];
      this.services = null;
      this._selectedAnimal = animal;

      this.servicesService.getData().then(services => {
        this.services = services.slice(animal - 1);
      });
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

    selectServices(services) {
      this.selectedServices = services;
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
          return this.name.trim().length > 0;

        default:
          return false;
      }
    }
  }
};
