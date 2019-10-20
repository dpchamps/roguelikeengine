// import { Tileset } from './Tileset';
// import { empty2dArray, iterate2dArray } from '../util/2dArray';
// import { Grid } from './Grid';
// import { Container, Rectangle } from 'pixi.js';
// import { Tile } from './Tile';
// import { Camera } from './Camera';
//
// export class Palette {
//   tileset: Tileset;
//   tileData: Array<Array<number>>;
//   grid: Grid | null = null;
//   container: Container = new Container();
//   tiles: Array<Tile> = [];
//
//   width: number;
//   height: number;
//
//   constructor(
//     tileset: Tileset,
//     width: number = 0,
//     height: number = 0,
//     x: number = 0,
//     y: number = 0,
//   ) {
//     this.tileset = tileset;
//     this.width = width;
//     this.height = height;
//     this.tileData = empty2dArray(this.height, this.width, 100);
//     this.container.x = x;
//     this.container.y = y;
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
//   set y(value) {
//     this.container.y = value;
//   }
//
//   getBounds() {
//     return new Rectangle(
//       this.x,
//       this.y,
//       this.width * this.tileset.square,
//       this.height * this.tileset.square,
//     );
//   }
//
//   setGrid(grid: Grid) {
//     this.grid = grid;
//   }
//
//   setTileData(tileData: Array<Array<number>>, startX = 0, startY = 0) {
//     for (let x = startX; x < this.width; x += 1) {
//       for (let y = startY; y < this.height; y += 1) {
//         this.tileData[y][x] = tileData[y - startY][x - startX];
//       }
//     }
//   }
//
//   drawTileData() {
//     if (this.grid === null) {
//       throw new Error(`Cannot draw a palette without a grid`);
//     }
//
//     this.container.removeChildren();
//     this.tiles = [];
//
//     for (let x = 0; x < this.width; x += 1) {
//       for (let y = 0; y < this.height; y += 1) {
//         const tileIdx = this.tileData[y][x];
//         const tile = this.tileset.getTile(tileIdx);
//
//         tile.x = this.tileset.toTileCoord(x);
//         tile.y = this.tileset.toTileCoord(y);
//
//         this.container.addChild(tile.sprite);
//         this.tiles.push(tile);
//       }
//     }
//   }
//
//   static load(tileset: Tileset, paletteData: any) {
//     const palette = new Palette(
//       tileset,
//       paletteData.width,
//       paletteData.height,
//       paletteData.x,
//       paletteData.y,
//     );
//
//     palette.setTileData(paletteData.tileData);
//
//     return palette;
//   }
//
//   render(camera: Camera) {
//     for (let i = 0; i < this.tiles.length; i += 1) {
//       const tile = this.tiles[i];
//
//       tile.sprite.visible = camera.isInViewPort(tile.sprite.getBounds());
//     }
//   }
//
//   update(delta: number) {
//     this.tiles.forEach(tile => tile.update(delta));
//   }
// }
