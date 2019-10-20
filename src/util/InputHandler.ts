export enum InputType {
  PRESS,
  HOLD,
  RELEASE,
}

type Handler = () => void;

type KeyboardAction = {
  type: InputType;
  handler: Handler;
};

export class InputHandler {
  private queue: Array<Handler> = [];
  private actions: Map<string, KeyboardAction[]> = new Map();
  private keys: Set<string> = new Set();
  private firstPress: Set<string> = new Set();

  constructor() {
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  private onKeyUp(event: KeyboardEvent) {
    this.keys.delete(event.key);
    this.firstPress.delete(event.key);

    for (const action of this.actions.get(event.key) || []) {
      if (action.type === InputType.RELEASE) {
        this.queue.push(action.handler);
      }
    }
  }

  private onKeyDown(event: KeyboardEvent) {
    this.keys.add(event.key);
  }

  private canAddToQueue(key: string, action: KeyboardAction) {
    return (
      (this.firstPress.has(key) && action.type === InputType.HOLD) ||
      (!this.firstPress.has(key) && action.type === InputType.PRESS)
    );
  }

  on(key: string, type: InputType, handler: Handler) {
    const actions = this.actions.get(key) || [];
    actions.push({ type, handler });
    this.actions.set(key, actions);
  }

  update() {
    for (const key of this.keys) {
      const registeredActions = this.actions.get(key) || [];
      for (const action of registeredActions) {
        if (this.canAddToQueue(key, action)) {
          this.queue.push(action.handler);
        }
        this.firstPress.add(key);
      }
    }

    for (const action of this.queue) {
      action();
    }

    this.queue = [];
  }
}
