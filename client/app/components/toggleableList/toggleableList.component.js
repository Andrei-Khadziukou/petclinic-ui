import template from "./toggleableList.component.html";
import "./toggleableList.component.scss";

let toggleableListComponent = {
  restrict: "E",
  bindings: {
    filter: "<",
    items: "<",
    onToggle: "&"
  },
  template,
  controller: class {}
};
export default toggleableListComponent;
