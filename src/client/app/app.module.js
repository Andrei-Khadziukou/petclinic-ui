import "normalize.css";
import angular from "angular";
import "ng-tags-input";
import "ng-tags-input/build/ng-tags-input.min.css";
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
  .module("app", [
    ComponentsModule.name,
    ServicesModule.name,
    UIRouter,
    "ngTagsInput"
  ])
  .config([
    "$stateProvider",
    $stateProvider => {
      $stateProvider.state(clientState);
      $stateProvider.state(adminState);
    }
  ])
  .component("app", appComponent);
