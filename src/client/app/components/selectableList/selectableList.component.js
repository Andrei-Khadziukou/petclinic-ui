import template from "./selectableList.component.html";
import "./selectableList.component.scss";

let selectableListComponent = {
  restrict: "E",
  bindings: {
    filter: "<",
    items: "<",
    selected: "<",
    deletable: "<",
    markable: "<",
    onSelect: "&",
    onDelete: "&",
    onRevert: "&"
  },
  template,
  controller: class {
    toggleDeletingStatus(item) {
      if (item.isDeleted) {
        this.onRevert({ id: item.id });
      } else {
        this.onDelete({ id: item.id });
      }
    }
  }
};
export default selectableListComponent;
