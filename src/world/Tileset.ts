// import { utils, Rectangle, Sprite, Texture } from 'pixi.js';
// import { Tile } from './Tile';
//
// export class Tileset {
//   tilesetPath: string;
//   square: number;
//   offset: number;
//   tileTextures: Array<Texture> = [];
//
//   constructor(path: string, square: number, offset: number) {
//     this.tilesetPath = path;
//     this.square = square;
//     this.offset = offset;
//
//     this.extractTilesFromTexture();
//   }
//
//   get texture(): Texture {
//     return utils.TextureCache[this.tilesetPath];
//   }
//
//   get cols() {
//     return Math.round(this.texture.width / (this.square + this.offset));
//   }
//
//   get rows() {
//     return Math.round(this.texture.height / (this.square + this.offset));
//   }
//
//   toTileCoord(coord: number) {
//     return coord * (this.square - 1);
//   }
//
//   fromTileCoord(coord: number) {
//     return coord / this.square;
//   }
//
//   toTileOffsetCoord(coord: number) {
//     return coord * (this.square + this.offset);
//   }
//
//   createSubTexture(x: number, y: number) {
//     const tex = this.texture.clone();
//
//     tex.frame = new Rectangle(
//       this.toTileOffsetCoord(x),
//       this.toTileOffsetCoord(y),
//       this.square,
//       this.square,
//     );
//
//     return tex;
//   }
//
//   createSprite(x: number, y: number) {
//     return new Sprite(this.createSubTexture(x, y));
//   }
//
//   getTile(idx: number): Tile {
//     return new Tile(this.tileTextures[idx]);
//   }
//
//   getTileFromXY(x: number, y: number) {
//     return this.getTile(this.getTileIdx(x, y));
//   }
//
//   getTileIdx(x: number, y: number) {
//     return x * this.rows + y;
//   }
//
//   private extractTilesFromTexture() {
//     for (let x = 0; x < this.cols; x += 1) {
//       for (let y = 0; y < this.rows; y += 1) {
//         this.tileTextures.push(this.createSubTexture(x, y));
//       }
//     }
//   }
// }
