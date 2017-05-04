import "normalize.css";
import angular from "angular";
import appComponent from "./app.component";
import ComponentsModule from "./components/components";
import ServicesModule from "./services/services";

angular
  .module("app", [ComponentsModule.name, ServicesModule.name])
  .component("app", appComponent);
