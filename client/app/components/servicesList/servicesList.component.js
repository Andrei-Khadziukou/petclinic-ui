import template from "./servicesList.component.html";
import "./servicesList.component.scss";

let servicesListComponent = {
  restrict: "E",
  bindings: {
    items: "<",
    onToggle: "&"
  },
  template,
  controller: class {
    constructor() {
      this.query = "";
    }
  }
};
export default servicesListComponent;
