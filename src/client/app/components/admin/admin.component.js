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
  forEachObjIndexed,
  sortBy,
  reject
} from "ramda";
import { get, set } from "lodash";

import template from "./admin.component.html";
import "./admin.component.scss";

const ungroup = curry((keyKey, valueKey, obj) =>
  pipe(
    toPairs,
    map(([keyValue, valueValues]) =>
      map(valueValue => ({
        [keyKey]: keyValue,
        [valueKey]: valueValue
      }))(valueValues)
    ),
    flatten
  )(obj)
);

const mapIntoObj = (keyFn, valueFn) =>
  pipe(map(juxt([keyFn, valueFn])), fromPairs);

export default {
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

      this.isLoaded = false;

      this.fetch();
    }

    fetch(name) {
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

          this.sortClinics();

          this.offers = pipe(
            mapIntoObj(prop("id"), prop("offers")),
            map(groupBy(path(["animal", "id"]))),
            map(map(map(path(["clinicService", "id"]))))
          )(clinics);

          if (!isNil(name) && !isNil(this.clinicByName(name))) {
            this.selectClinic(this.clinicByName(name).id);
          } else {
            this.selectClinic(this.clinics[0] && this.clinics[0].id);
          }
        });
    }

    sortClinics() {
      this.clinics.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    save() {
      let chain = this.$q.resolve();

      forEachObjIndexed((clinic, id) => {
        if (id < 0) {
          if (!clinic.isDeleted) {
            chain = chain.then(() => this.clinicsService.create(clinic));
          }
        } else if (clinic.isDeleted) {
          chain = chain.then(() => this.clinicsService.delete(id));
        } else {
          chain = chain.then(() => this.clinicsService.update(clinic, id));
        }
      }, this.clinicsToSend);

      const selectedClinicName = this.clinic && this.clinic.name;
      chain.then(() => this.fetch(selectedClinicName));
    }

    reset() {
      const selectedClinicName = this.clinic && this.clinic.name;
      this.fetch(selectedClinicName);
    }

    addClinic() {
      const id = this.newClinicIndex--;

      let newIndex = 0;
      let name;

      do {
        newIndex += 1;
        name = `New Clinic #${newIndex}`;
      } while (!isNil(this.clinicByName(name)));

      this.clinics.push({
        id,
        isDirty: true,
        name,
        address: ""
      });

      this.sortClinics();

      this.selectClinic(id);
    }

    setDeleteStatusClinic(status, id) {
      for (const clinic of this.clinics) {
        if (clinic.id === id) {
          clinic.isDeleted = status;
          clinic.isDirty = true;
          break;
        }
      }
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

    clinicByID(id) {
      return this.clinics.find(propEq("id", id));
    }

    clinicByName(name) {
      return this.clinics.find(propEq("name", name));
    }

    get clinic() {
      return this.clinicByID(this.selectedClinic);
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

      const buildClinic = clinic => {
        if (clinic.isDeleted) {
          if (!(clinic.id < 0)) {
            return { isDeleted: true };
          }
        } else {
          return applySpec({
            name: prop("name"),
            address: prop("address"),
            offers: buildOffers
          })(clinic);
        }
      };

      const clinicsToSend = pipe(
        filter(prop("isDirty")),
        mapIntoObj(prop("id"), buildClinic),
        reject(isNil)
      );

      return clinicsToSend(this.clinics);
    }
  }
};
