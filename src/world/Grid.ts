// import { Palette } from './Palette';
// import { Container, Rectangle } from 'pixi.js';
// import { GameObject } from '../entity/GameObject';
// import { Camera } from './Camera';
//
// export class Grid {
//   cellSize: number;
//   palettes: Array<Palette> = [];
//   gameObjects: Array<GameObject> = [];
//   container: Container = new Container();
//   worldBounds: Rectangle = new Rectangle(0, 0, 0, 0);
//
//   constructor(cellSize: number) {
//     this.cellSize = cellSize;
//   }
//
//   addPalette(palette: Palette) {
//     palette.setGrid(this);
//     this.palettes.push(palette);
//     this.container.addChild(palette.container);
//     this.calculateWorldBounds();
//   }
//
//   addGameObject(gameObject: GameObject) {
//     this.gameObjects.push(gameObject);
//     this.container.addChild(gameObject.container);
//   }
//
//   snap(value: number) {
//     return Math.round(value / this.cellSize) * this.cellSize;
//   }
//
//   drawTileData() {
//     this.palettes.forEach(palette => palette.drawTileData());
//   }
//
//   render(camera: Camera) {
//     this.palettes.forEach(palette => palette.render(camera));
//   }
//
//   update(delta: number) {
//     this.palettes.forEach(palette => palette.update(delta));
//     this.gameObjects.forEach(go => go.update(delta));
//   }
//
//   private calculateWorldBounds() {
//     this.palettes.forEach(palette => {
//       const paletteBounds = palette.getBounds();
//
//       this.worldBounds.x = Math.min(this.worldBounds.x, paletteBounds.x);
//       this.worldBounds.y = Math.min(this.worldBounds.y, paletteBounds.y);
//       this.worldBounds.width = Math.max(this.worldBounds.width, paletteBounds.width);
//       this.worldBounds.height = Math.max(this.worldBounds.height, paletteBounds.height);
//     });
//   }
// }
