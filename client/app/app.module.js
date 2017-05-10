import "normalize.css";
import angular from "angular";
import UIRouter from "@uirouter/angularjs";
import appComponent from "./app.component";
import ComponentsModule from "./components/components";
import ServicesModule from "./services/services";

const clientState = {
  name: "client",
  url: "",
  template: "<client></client>"
};

const adminState = {
  name: "admin",
  url: "/admin",
  template: "<admin></admin>"
};
angular
  .module("app", [ComponentsModule.name, ServicesModule.name, UIRouter])
  .config([
    "$stateProvider",
    $stateProvider => {
      $stateProvider.state(clientState);
      $stateProvider.state(adminState);
    }
  ])
  .component("app", appComponent);
