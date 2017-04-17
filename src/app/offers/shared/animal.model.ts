import { SelectableItem } from './selectable-item.model';

export class Animal implements SelectableItem {
  constructor(
    public id: number,
    public name: string,
  ) { }
}
