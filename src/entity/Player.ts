// import { Sprite } from 'pixi.js';
// import { Entity } from './Entity';
// import { Controller } from '../component/Controller';
// import { Physics } from '../component/Physics';
// import { Vector2D } from '../util/Vector2D';
// import { TextBox } from '../gui/TextBox';
// import { gui } from '../gui/Gui';
// import { Inventory, InventoryItem } from '../gui/Inventory';
// import { KeyCode } from '../util/KeyCode';
//
// const beeBox = new InventoryItem('Bee Box', 1, {
//   eat: false,
//   drop: false,
//   place: true,
//   sell: true,
// });
// const smoke = new InventoryItem('Smoke', 10, {
//   eat: false,
//   drop: true,
//   place: true,
//   sell: true,
// });
// const pollen = new InventoryItem('Pollen', 25, {
//   eat: true,
//   drop: true,
//   place: true,
//   sell: true,
// });
//
// export class Player extends Entity {
//   maxSpeed = 4;
//   inventory: Inventory = new Inventory();
//
//   constructor(sprite?: Sprite) {
//     super(sprite);
//
//     this.getComponent(Physics).mass = 3;
//     this.attachController();
//
//     this.inventory.addItem(beeBox);
//     this.inventory.addItem(pollen);
//     this.inventory.addItem(pollen);
//     this.inventory.addItem(smoke);
//   }
//
//   private attachController() {
//     const physics = this.getComponent(Physics);
//     const controller = new Controller();
//
//     const movementFn = (vector: Vector2D) => {
//       if (gui.isExclusiveElementOpen) return;
//       physics.velocity.add(vector);
//       physics.velocity.clamp(-this.maxSpeed, this.maxSpeed);
//     };
//
//     controller.hold(['w', 'W'], () => {
//       movementFn(Vector2D.up());
//     });
//
//     controller.hold(['s', 'S'], () => {
//       movementFn(Vector2D.down());
//     });
//
//     controller.hold(['a', 'A'], () => {
//       movementFn(Vector2D.left());
//     });
//
//     controller.hold(['d', 'D'], () => {
//       movementFn(Vector2D.right());
//     });
//
//     controller.press(['L'], () => {
//       if (gui.has(`assessment`)) return;
//
//       const assessment = new TextBox([
//         `This area is lush. The flora is diverse. `,
//         `The habitat is sustainable with several feral hives in the vicinity.`,
//         `The chance for Africanization of colonies is moderate.`,
//       ]);
//
//       gui.addElement(assessment, `assessment`);
//     });
//
//     controller.press('l', () => {
//       if (gui.has(`look`)) return;
//
//       const look = new TextBox([`There's nothing around...`]);
//
//       gui.addElement(look, `look`);
//     });
//
//     controller.press(['i', 'I'], () => {
//       if (gui.has('inventory')) return;
//
//       gui.addElement(this.inventory, 'inventory');
//     });
//
//     controller.press(KeyCode.Escape, () => {
//       gui.closeExclusiveElement();
//     });
//
//     this.addComponent(controller);
//   }
// }
