import { Container, Rectangle, Graphics, Text } from 'pixi.js';
import { application } from '../renderer/application';
import { type } from 'os';
import { TextBox } from './TextBox';

type GuiFixture = any | Graphics | Text;
type LineStyle = [number?, number?, number?, number?, boolean?];

export class GuiElement {
  private graphics: Array<GuiFixture> = [];
  private parent: Gui | null = null;

  exclusiveElement: boolean = false;

  container: Container = new Container();

  onAttached() {}

  add(graphic: GuiFixture) {
    this.graphics.push(graphic);
    return this;
  }

  addRect(width: number, height: number, fill: number | undefined, lineStyle: LineStyle) {
    const rectGraphic = new Graphics();

    rectGraphic.lineStyle.apply(rectGraphic, lineStyle);
    rectGraphic.beginFill(fill);
    rectGraphic.drawRect(0, 0, width, height);
    rectGraphic.endFill();

    this.add(rectGraphic);

    return rectGraphic;
  }

  show() {
    this.container.visible = true;
  }

  hide() {
    this.container.visible = false;
  }

  destroy() {
    if (this.parent === null) throw new RangeError(`GUIElement is not attached`);

    this.parent.removeElement(this);
  }

  render() {
    this.container.removeChildren();
    this.graphics.forEach(graphic => {
      this.container.addChild(graphic);
    });

    return this.container;
  }
}

class Gui {
  readonly container: Container = new Container();

  private readonly idLookup: Map<GuiElement, string> = new Map();
  private readonly elementLookup: Map<string, GuiElement> = new Map();

  private exclusiveElementOpen: boolean = false;

  private deriveElementAndId(identifier: GuiElement | string): [GuiElement, string] {
    const el: GuiElement | undefined =
      typeof identifier === 'string' ? this.elementLookup.get(identifier) : identifier;
    const id: string | undefined =
      identifier instanceof GuiElement ? this.idLookup.get(identifier) : identifier;

    if (!el || !id) throw new TypeError(`GuiElement ${identifier} does not exist.`);

    return [el, id];
  }

  private exclusiveCheck(guiElement: GuiElement) {
    if (!guiElement.exclusiveElement) {
      return;
    }

    this.closeExclusiveElement();
    this.exclusiveElementOpen = true;
  }

  get isExclusiveElementOpen() {
    return this.exclusiveElementOpen;
  }

  closeExclusiveElement() {
    if (this.exclusiveElementOpen) {
      Array.from(this.idLookup.keys())
        .find(x => x.exclusiveElement)!
        .destroy();
    }
  }

  addElement(guiElement: GuiElement, id?: string) {
    Reflect.set(guiElement, 'parent', this);
    this.container.addChild(guiElement.render());
    id = !id ? `GUIElement${this.container.children.length}` : id;

    this.exclusiveCheck(guiElement);

    this.idLookup.set(guiElement, id);
    this.elementLookup.set(id, guiElement);

    guiElement.onAttached();
  }

  removeElement(guiElement: GuiElement | string) {
    const [el, id] = this.deriveElementAndId(guiElement);

    Reflect.set(el, 'parent', null);

    if (el.exclusiveElement) {
      this.exclusiveElementOpen = false;
    }

    this.container.removeChild(el.container);
    this.elementLookup.delete(id);
    this.idLookup.delete(el);
  }

  has(guiElement: GuiElement | string) {
    try {
      this.deriveElementAndId(guiElement);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export const gui = new Gui();
