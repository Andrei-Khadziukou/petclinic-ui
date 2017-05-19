import angular from 'angular';
import servicesListComponent from './servicesList.component';

const servicesListModule = angular.module('servicesList', [])
  .component('servicesList', servicesListComponent);
export default servicesListModule;