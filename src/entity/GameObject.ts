// import { Container, Sprite } from 'pixi.js';
// import { IGameObject } from './IGameObject';
// import { Component } from '../component/Component';
// import { Vector2D } from '../util/Vector2D';
//
// export class GameObject implements IGameObject {
//   readonly container: Container = new Container();
//   readonly components: Map<string, Component> = new Map();
//
//   constructor(sprite?: Sprite) {
//     if (sprite) this.container.addChild(sprite);
//   }
//
//   get x() {
//     return this.container.x;
//   }
//
//   set x(value: number) {
//     this.container.x = value;
//   }
//
//   get y() {
//     return this.container.y;
//   }
//
//   set y(value: number) {
//     this.container.y = value;
//   }
//
//   get center() {
//     return {
//       x: Math.floor(this.x + this.container.width / 2),
//       y: Math.floor(this.y + this.container.height / 2),
//     };
//   }
//
//   addComponent(component: Component) {
//     Reflect.set(component, '_parent', this);
//     this.components.set(component.constructor.name, component);
//   }
//
//   removeComponent<T extends Component>(component: new () => T) {
//     Reflect.set(component, '_parent', null);
//     this.components.delete(component.name);
//   }
//
//   getComponent<T extends Component>(component: new () => T) {
//     return <T>this.components.get(component.name);
//   }
//
//   private updateComponents(delta: number) {
//     for (const component of this.components.values()) {
//       component.update(delta);
//     }
//   }
//
//   update(delta: number) {
//     this.updateComponents(delta);
//   }
// }
