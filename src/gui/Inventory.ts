import { GuiElement } from './Gui';
import { defaultFontStyle, defaultSecondaryFontStyle } from './consts';
import { Text } from 'pixi.js';
import { application } from '../renderer/application';
import { Container } from 'pixi.js';

export class Inventory extends GuiElement {
  private itemSpriteContainer = new Container();
  private width = 120;
  private height = application.renderer.height / application.renderer.resolution - 2;
  private inventoryItems: Array<InventoryItem> = [];
  private selectionIndex = 0;
  private controlsListener = this.controls.bind(this);
  private reticle = new Text('◀', defaultSecondaryFontStyle);

  exclusiveElement = true;

  title = new Text('Inventory', defaultFontStyle);
  instructions = new Text('', defaultSecondaryFontStyle);

  constructor() {
    super();

    this.initialize();

    this.container.x = application.screen.width / 2 - this.width / 2;
    this.container.y = 1;
    this.add(this.reticle);
    document.addEventListener('keydown', this.controlsListener);
  }

  private setBg() {
    this.addRect(this.width, this.height, 0x0000a7, [2, 0x000007, 1]);
  }

  private setText() {
    this.title.x = 1;
    this.instructions.text = this.instructions.text || 'Empty';
    this.instructions.x = 1;
    this.instructions.y = 10;

    this.add(this.title);
    this.add(this.instructions);
    this.add(this.itemSpriteContainer);
  }

  private getCurrentItem() {
    return this.inventoryItems[this.selectionIndex].getPropertyString();
  }

  private setItems() {
    const offsetX = 1;
    const offsetY = 25;

    this.itemSpriteContainer.removeChildren();

    for (let i = 0; i < this.inventoryItems.length; i += 1) {
      const item = this.inventoryItems[i];
      const itemName = new Text(item.getName(), defaultSecondaryFontStyle);
      const itemCount = new Text(item.getCount().toString(), defaultSecondaryFontStyle);

      itemName.x = offsetX;
      itemName.y = offsetY + i * 9;

      itemCount.x = offsetX + 35;
      itemCount.y = offsetY + i * 9;

      this.itemSpriteContainer.addChild(itemName);
      this.itemSpriteContainer.addChild(itemCount);
    }
  }

  private setReticle() {
    if (this.inventoryItems.length === 0) {
      this.reticle.visible = false;
    } else {
      this.instructions.text = this.getCurrentItem();
      this.reticle.visible = true;
      this.reticle.x = 50;
      this.reticle.y = 25 + this.selectionIndex * 9;
    }
  }

  private initialize() {
    this.container.addChild(this.itemSpriteContainer);
    this.setBg();
    this.setText();
    this.setItems();
  }

  private controls(e: KeyboardEvent) {
    if (this.container.parent === null) return;
    switch (e.key) {
      case '.':
        this.cycleNext();
        break;
      case ',':
        this.cyclePrevious();
        break;
    }
  }

  private update() {
    this.setItems();
    this.setReticle();
  }

  render() {
    super.render();
    this.update();

    return this.container;
  }

  cycleNext() {
    if (this.inventoryItems.length === 0 || this.selectionIndex === this.inventoryItems.length - 1)
      return;
    this.selectionIndex += 1;
    this.update();
  }

  cyclePrevious() {
    if (this.inventoryItems.length === 0 || this.selectionIndex === 0) return;

    this.selectionIndex -= 1;
    this.update();
  }

  addItem(item: InventoryItem) {
    const existingIdx = this.inventoryItems.findIndex(x => x.getName() === item.getName());

    if (existingIdx !== -1) {
      this.inventoryItems[existingIdx].increment(item.getCount());
    } else {
      this.inventoryItems.push(item);
    }

    this.update();
  }

  removeItem(item: InventoryItem) {
    const existingIdx = this.inventoryItems.findIndex(x => x.getName() === item.getName());

    if (existingIdx !== -1) {
      const currentCount = this.inventoryItems[existingIdx].getCount();
      if (currentCount < item.getCount()) {
        item.setCount(currentCount);
      }
      this.inventoryItems[existingIdx].decrement(item.getCount());
    } else {
      this.inventoryItems.push(item);
    }

    const nextIdx = this.inventoryItems.findIndex(x => x.getName() === item.getName());

    if (this.inventoryItems[nextIdx].getCount() === 0) {
      this.inventoryItems.splice(nextIdx, 1);
    }

    this.update();
  }
}

export interface IInventoryItemProperties {
  drop: boolean;
  place: boolean;
  eat: boolean;
  sell: boolean;
}

const defaultIventoryItemProps: IInventoryItemProperties = {
  drop: true,
  place: false,
  eat: true,
  sell: true,
};

const propDescriptions: { [key: string]: string } = {
  drop: 'Drop: d',
  place: 'Place: p',
  eat: 'Eat: e',
};

export class InventoryItem {
  private count: number;
  private readonly name: string;

  properties: IInventoryItemProperties;

  constructor(
    name: string,
    count: number = 1,
    properties: IInventoryItemProperties = defaultIventoryItemProps,
  ) {
    this.count = count;
    this.name = name;
    this.properties = properties;
  }

  getCount() {
    return this.count;
  }

  setCount(value: number) {
    this.count = value;
  }

  getName() {
    return this.name;
  }

  getPropertyString() {
    return Object.entries(this.properties).reduce((propString, [prop, active]) => {
      if (active && propDescriptions.hasOwnProperty(prop)) {
        return `${propDescriptions[prop]}, ${propString}`;
      } else {
        return propString;
      }
    }, '');
  }

  increment(count: number = 1) {
    this.count += count;
  }

  decrement(count: number = 1) {
    this.count -= count;
  }
}
