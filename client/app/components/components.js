import angular from 'angular';
    import AnimalsListModule from './animalsList/animalsList.module';

const ComponentsModule = angular.module('app.components',[
       AnimalsListModule.name, 
]);

export default ComponentsModule;