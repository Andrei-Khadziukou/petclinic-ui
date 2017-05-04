import template from "./search.component.html";
import "./search.component.scss";

let searchComponent = {
  restrict: "E",
  bindings: {
    title: "<",
    query: "="
  },
  template,
  controller: class searchController {
    constructor() {}

    get placeholder() {
      return `Search ${this.title.toLowerCase()}...`;
    }
  }
};

export default searchComponent;
