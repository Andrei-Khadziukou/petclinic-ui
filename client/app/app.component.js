import {
  groupBy,
  prop,
  path,
  pipe,
  pluck,
  map,
  filter,
  isNil,
  toPairs,
  flatten,
  propEq,
  indexOf,
  toString,
  assoc,
  __,
  objOf,
  curry,
  applySpec,
  fromPairs,
  juxt,
  forEachObjIndexed
} from "ramda";
import { get, set } from "lodash";

import template from "./app.component.html";
import "./app.component.scss";

const ungroup = curry((keyKey, valueKey, obj) =>
  pipe(
    toPairs,
    map(([keyValue, valueValues]) =>
      map(
        valueValue => ({
          [keyKey]: keyValue,
          [valueKey]: valueValue
        }),
        valueValues
      )
    ),
    flatten
  )(obj)
);

const mapIntoObj = (keyFn, valueFn) =>
  pipe(map(juxt([keyFn, valueFn])), fromPairs);

const AppComponent = {
  template,
  controller: class {
    /* @ngInject */
    constructor($q, clinicsService, animalsService, servicesService) {
      Object.assign(this, {
        $q,
        clinicsService,
        animalsService,
        servicesService
      });

      this.fetch();
    }

    fetch() {
      this.isLoaded = false;
      this.newClinicIndex = -1;

      this.$q
        .all([
          this.clinicsService.getData(),
          this.animalsService.getData(),
          this.servicesService.getData()
        ])
        .then(([clinics, animals, services]) => {
          this.isLoaded = true;

          this.clinics = clinics;
          this.animals = animals;
          this.services = services;

          this.offers = pipe(
            mapIntoObj(prop("id"), prop("offers")),
            map(groupBy(path(["animal", "id"]))),
            map(map(map(path(["clinicService", "id"]))))
          )(clinics);

          this.selectClinic(this.clinics[0].id);
        });
    }

    save() {
      let chain = this.$q.resolve();

      forEachObjIndexed((clinic, id) => {
        if (id < 0) {
          chain = chain.then(() => this.clinicsService.create(clinic));
        } else {
          chain = chain.then(() => this.clinicsService.update(clinic, id));
        }
      }, this.clinicsToSend);

      chain.then(() => this.fetch());
    }

    addClinic() {
      const id = this.newClinicIndex--;

      this.clinics.push({
        id,
        isDirty: true,
        name: `new clinic ${-id}`,
        address: ""
      });
    }

    get offersPath() {
      return [this.selectedClinic, this.selectedAnimal];
    }

    updateServices() {
      for (const service of this.services) {
        const offers = get(this.offers, this.offersPath);

        if (isNil(offers)) {
          service.isActive = false;
        } else {
          service.isActive = offers.indexOf(service.id) !== -1;
        }
      }
    }

    selectClinic(id) {
      this.selectedClinic = id;
      this.selectAnimal(this.selectedAnimal || this.animals[0].id);
    }

    selectAnimal(id) {
      this.selectedAnimal = id;
      this.updateServices();
    }

    toggleService(id) {
      this.clinic.isDirty = true;

      if (isNil(get(this.offers, this.offersPath))) {
        set(this.offers, this.offersPath, []);
      }

      const offers = get(this.offers, this.offersPath);

      if (offers.indexOf(id) === -1) {
        offers.push(id);
      } else {
        set(
          this.offers,
          this.offersPath,
          offers.filter(service => service !== id)
        );
      }

      this.updateServices();
    }

    get clinic() {
      return this.clinics.find(propEq("id", this.selectedClinic));
    }

    get clinicName() {
      return this.clinic.name;
    }

    set clinicName(newName) {
      this.clinic.isDirty = true;
      this.clinic.name = newName;
    }

    get clinicAddress() {
      return this.clinic.address;
    }

    set clinicAddress(newAddress) {
      this.clinic.isDirty = true;
      this.clinic.address = newAddress;
    }

    get clinicsToSend() {
      // prettier-ignore
      const offersForClinic = pipe(
        prop("id"),
        prop(__, this.offers),
      );

      const buildEntities = map(objOf("id"));

      const buildOffers = pipe(
        offersForClinic,
        ungroup("animal", "clinicService"),
        map(buildEntities)
      );

      const buildClinic = applySpec({
        name: prop("name"),
        address: prop("address"),
        offers: buildOffers
      });

      const clinicsToSend = pipe(
        filter(prop("isDirty")),
        mapIntoObj(prop("id"), buildClinic)
      );

      return clinicsToSend(this.clinics);
    }
  }
};

export default AppComponent;