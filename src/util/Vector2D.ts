import { clamp, lerp, trim } from './Math/MathD';

export class Vector2D {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  static zero() {
    return new Vector2D(0, 0);
  }

  static n(n: number) {
    return new Vector2D(n, n);
  }

  static up() {
    return new Vector2D(0, -1);
  }

  static right() {
    return new Vector2D(1, 0);
  }

  static down() {
    return new Vector2D(0, 1);
  }

  static left() {
    return new Vector2D(-1, 0);
  }

  static from(vector: Vector2D) {
    return new Vector2D(vector.x, vector.y);
  }

  static inverse(vector: Vector2D) {
    return new Vector2D(-vector.x, -vector.y);
  }

  static deserialize(input: string | Array<string | number>) {
    let x = 0;
    let y = 0;
    if (typeof input === 'string') {
      [x, y] = input
        .replace(/\(\)/gi, '')
        .split(',')
        .map(x => Number(x.trim()));
    } else if (Array.isArray(input)) {
      [x, y] = input.map(Number);
    }

    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y;

    return new Vector2D(x, y);
  }

  add(vector: Vector2D) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  subtract(vector: Vector2D) {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  }

  scale(n: number) {
    this.x *= n;
    this.y *= n;

    return this;
  }

  magnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  normalize() {
    const magnitude = this.magnitude();

    if (magnitude === 0) return;

    this.x /= magnitude;
    this.y /= magnitude;

    return this;
  }

  dot(vector: Vector2D) {
    return this.x * vector.x + this.y * vector.y;
  }

  cross(vector: Vector2D) {
    return this.x * vector.y - this.y * vector.x;
  }

  equals(vector: Vector2D) {
    return this.x === vector.x && this.y === vector.y;
  }

  invert() {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  reset() {
    this.x = 0;
    this.y = 0;

    return this;
  }

  set(vector: Vector2D) {
    this.x = vector.x;
    this.y = vector.y;

    return this;
  }

  clone() {
    return new Vector2D(this.x, this.y);
  }

  toArray() {
    return [this.x, this.y];
  }

  clamp(min: number, max: number) {
    this.x = clamp(this.x, min, max);
    this.y = clamp(this.y, min, max);

    return this;
  }

  trim() {
    this.x = trim(this.x);
    this.y = trim(this.y);

    return this;
  }

  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);

    return this;
  }

  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

    return this;
  }

  lerp(to: Vector2D, n: number) {
    this.x = lerp(this.x, to.x, n);
    this.y = lerp(this.y, to.y, n);

    return this;
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  toString() {
    return `(${this.x},${this.y})`;
  }
}
