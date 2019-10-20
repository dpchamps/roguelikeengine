export const EPSILON = Number.EPSILON;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(value, min));

export const trim = (value: number, epsilon: number = EPSILON) =>
  Math.abs(value) < epsilon ? 0 : value;

export const lerp = (start: number, end: number, num: number) =>
  start * (1 - 1 / num) + end * (1 / num);
