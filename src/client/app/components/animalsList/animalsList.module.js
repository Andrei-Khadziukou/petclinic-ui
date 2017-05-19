import angular from 'angular';
import animalsListComponent from './animalsList.component';

const animalsListModule = angular.module('animalsList', [])
  .component('animalsList', animalsListComponent);
export default animalsListModule;