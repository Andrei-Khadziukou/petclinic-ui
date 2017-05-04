import template from "./clinicsList.component.html";
import "./clinicsList.component.scss";

let clinicsListComponent = {
  restrict: "E",
  bindings: {
    items: "<",
    selected: "<",
    onSelect: "&",
    onDelete: "&",
    onRevert: "&",
    onNew: "&"
  },
  template,
  controller: class {
    constructor() {
      this.query = "";
    }
  }
};
export default clinicsListComponent;
