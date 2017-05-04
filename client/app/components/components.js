import angular from 'angular';
    import AnimalsListModule from './animalsList/animalsList.module';    import SearchModule from './search/search.module';    import SelectableListModule from './selectableList/selectableList.module';    import ServicesListModule from './servicesList/servicesList.module';    import ToggleableListModule from './toggleableList/toggleableList.module';    import ClinicsListModule from './clinicsList/clinicsList.module';

const ComponentsModule = angular.module('app.components',[
       AnimalsListModule.name,      SearchModule.name,      SelectableListModule.name,      ServicesListModule.name,      ToggleableListModule.name,      ClinicsListModule.name 
]);

export default ComponentsModule;