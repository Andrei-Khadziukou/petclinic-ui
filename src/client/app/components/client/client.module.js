import angular from 'angular';
import clientComponent from './client.component';

const clientModule = angular.module('client', [])
  .component('client', clientComponent);
export default clientModule;