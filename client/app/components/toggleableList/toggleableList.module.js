import angular from 'angular';
import toggleableListComponent from './toggleableList.component';

const toggleableListModule = angular.module('toggleableList', [])
  .component('toggleableList', toggleableListComponent);
export default toggleableListModule;