import template from "./selectableList.component.html";
import "./selectableList.component.scss";

let selectableListComponent = {
  restrict: "E",
  bindings: {
    filter: "<",
    items: "<",
    selected: "<",
    onSelect: "&"
  },
  template
};
export default selectableListComponent;
