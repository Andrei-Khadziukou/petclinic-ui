import angular from 'angular';
import searchComponent from './search.component';

const searchModule = angular.module('search', [])
  .component('search', searchComponent);
export default searchModule;