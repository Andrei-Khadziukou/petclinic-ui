import angular from 'angular';
    import AdminModule from './admin/admin.module';    import AnimalsListModule from './animalsList/animalsList.module';    import ClinicsListModule from './clinicsList/clinicsList.module';    import SearchModule from './search/search.module';    import SelectableListModule from './selectableList/selectableList.module';    import ServicesListModule from './servicesList/servicesList.module';    import ToggleableListModule from './toggleableList/toggleableList.module';    import ClientModule from './client/client.module';

const ComponentsModule = angular.module('app.components',[
       AdminModule.name,      AnimalsListModule.name,      ClinicsListModule.name,      SearchModule.name,      SelectableListModule.name,      ServicesListModule.name,      ToggleableListModule.name,      ClientModule.name 
]);

export default ComponentsModule;