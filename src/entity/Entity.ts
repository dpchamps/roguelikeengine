// import { GameObject } from './GameObject';
// import { Sprite } from 'pixi.js';
// import { Physics } from '../component/Physics';
//
// export class Entity extends GameObject {
//   constructor(sprite?: Sprite) {
//     super(sprite);
//     this.attachPhysics();
//   }
//
//   private attachPhysics() {
//     this.addComponent(new Physics(10));
//   }
//
//   update(delta: number) {
//     super.update(delta);
//
//     this.x += this.getComponent(Physics).velocity.x;
//     this.y += this.getComponent(Physics).velocity.y;
//   }
// }
