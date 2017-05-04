import angular from 'angular';
import selectableListComponent from './selectableList.component';

const selectableListModule = angular.module('selectableList', [])
  .component('selectableList', selectableListComponent);
export default selectableListModule;