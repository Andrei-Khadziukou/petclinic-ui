import angular from 'angular';
import animalsService from './animals/animals';import clinicsService from './clinics/clinics';import ordersService from './orders/orders';import servicesService from './services/services';

const ServicesModule = angular.module('app.services', [])
  .service('animalsService', animalsService)  .service('clinicsService', clinicsService)  .service('ordersService', ordersService)  .service('servicesService', servicesService);

export default ServicesModule;