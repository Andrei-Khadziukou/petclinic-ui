import angular from 'angular';
import clinicsListComponent from './clinicsList.component';

const clinicsListModule = angular.module('clinicsList', [])
  .component('clinicsList', clinicsListComponent);
export default clinicsListModule;