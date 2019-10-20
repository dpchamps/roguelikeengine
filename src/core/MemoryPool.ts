type factory<T> = () => T;

interface IFactory<T> {
  create: () => T;
  initialize: (...any: any) => void;
  destroy: (...any: any) => void;
}

const GROWTH_RATE = 2;
const SLOT_IN_USE = Object.freeze({});

export class MemoryPool<T> {
  private readonly factory: factory<T>;
  private readonly pool: Array<T> = [];
  private readonly inUse: Set<T> = new Set();
  private readonly initialPoolSize: number;

  private index: number = -1;

  constructor(factory: factory<T>, poolSize = 8) {
    this.factory = factory;
    this.initialPoolSize = poolSize;
  }

  private getNextSize() {
    if (this.count === 0) {
      return this.initialPoolSize;
    }

    return (this.count * GROWTH_RATE) | 0;
  }

  private grow() {
    const nextCount = this.getNextSize();

    for (let i = this.count; i < nextCount; i += 1) {
      this.pool.push(this.factory());
    }

    this.index += 1;

    return this.count;
  }

  get count() {
    return this.pool.length;
  }

  get() {
    if (this.index === -1 || this.index === this.count) {
      this.grow();
    }

    const obj = this.pool[this.index];

    // @ts-ignore
    this.pool[this.index++] = SLOT_IN_USE;
    this.inUse.add(obj);

    return obj;
  }

  put(obj: T) {
    if (!this.inUse.has(obj))
      throw new TypeError(`This object didn't originate from the memory pool`);

    this.pool[--this.index] = obj;

    this.inUse.delete(obj);
  }
}
