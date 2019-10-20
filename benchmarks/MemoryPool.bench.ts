import { Suite } from 'benchmark';
import { MemoryPool } from '../src/core/MemoryPool';

const suite = new Suite();
class TestClass {
  internal: Array<string> = [];

  constructor() {
    this.internal = Array(1000).fill('a');
  }

  static factory() {
    return new TestClass();
  }
}

suite
  .add('Memory Pool Benchmarks', () => {
    const pool = new MemoryPool(() => new TestClass());
    const instances = [];
    for (let i = 0; i < 1000; i += 1) {
      instances.push(pool.get());
      if (instances.length > 100) {
        pool.put(instances.shift()!);
      }
    }
  })
  .add('Normal instance benchmarks', () => {
    const instances = [];

    for (let i = 0; i < 1000; i += 1) {
      instances.push(new TestClass());
    }
  })
  .on('complete', function() {
    // @ts-ignore
    console.log(this.map(x => x.toString()));
  })
  .run();
