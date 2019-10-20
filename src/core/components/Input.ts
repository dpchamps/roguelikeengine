import { Component } from '../../ECS/ComponentManager';

interface IInput {
  [idx: string]: Array<string>;
}

export class Input extends Component<IInput> {
  init(o: {} | IInput = {}) {
    Object.entries(o).forEach(([k, v]) => {
      this[k] = v;
    });
  }
}
