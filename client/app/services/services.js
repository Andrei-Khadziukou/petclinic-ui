import angular from "angular";
import animalsService from "./animals/animals";
import clinicsService from "./clinics/clinics";
import servicesService from "./services/services";

const ServicesModule = angular
  .module("app.services", [])
  .service("animalsService", animalsService)
  .service("clinicsService", clinicsService)
  .service("servicesService", servicesService);

export default ServicesModule;
