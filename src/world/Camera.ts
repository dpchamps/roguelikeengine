// import { GameObject } from '../entity/GameObject';
// import { Rectangle, Container } from 'pixi.js';
// import { clamp, lerp } from '../util/Math/MathD';
// import { Grid } from './Grid';
//
// export class Camera extends Rectangle {
//   private follower: GameObject | null = null;
//   private base: Grid | null = null;
//   readonly edge: number;
//   readonly viewport: Rectangle;
//
//   constructor(width: number, aspectRatio: number = 1.77, x = 0, y = 0, edge = 10) {
//     super(x, y, width, Math.floor(width / aspectRatio));
//     this.edge = edge;
//     this.viewport = new Rectangle(-edge, -edge, this.width + edge, this.height + edge);
//   }
//
//   isInViewPort(bounds: Rectangle) {
//     const centerX = bounds.x + bounds.width / 2;
//     const centerY = bounds.y + bounds.height / 2;
//
//     return this.viewport.contains(centerX, centerY);
//   }
//
//   attach(container: Grid) {
//     this.base = container;
//   }
//
//   detach() {
//     this.base = null;
//   }
//
//   follow(gameObject: GameObject) {
//     this.follower = gameObject;
//   }
//
//   free() {
//     this.follower = null;
//   }
//
//   update(delta: number) {
//     if (this.base === null) return;
//     if (this.follower !== null) {
//       const { x, y } = this.follower.center;
//
//       // console.log(this.getViewport(), this.getViewport().contains(12));
//
//       this.x = clamp(Math.floor(x - this.width / 2), 0, this.base.worldBounds.width / 2);
//       this.y = clamp(Math.floor(y - this.height / 2), 0, this.base.worldBounds.height / 2);
//       this.base.container.x = lerp(this.base.container.x, -this.x, delta / 17) | 0;
//       this.base.container.y = lerp(this.base.container.y, -this.y, delta / 17) | 0;
//     }
//   }
// }
