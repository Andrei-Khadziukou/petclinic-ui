import template from "./animalsList.component.html";
import "./animalsList.component.scss";

export default {
  restrict: "E",
  bindings: {
    items: "<",
    selected: "<",
    onSelect: "&"
  },
  scope: {
    query: ""
  },
  template
};
