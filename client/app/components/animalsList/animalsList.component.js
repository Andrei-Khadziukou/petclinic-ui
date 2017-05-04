import template from "./animalsList.component.html";
import "./animalsList.component.scss";

let animalsListComponent = {
  restrict: "E",
  bindings: {
    items: "<",
    selected: "<",
    onSelect: "&"
  },
  template,
  controller: class {
    constructor() {
      this.query = "";
    }
  }
};
export default animalsListComponent;
