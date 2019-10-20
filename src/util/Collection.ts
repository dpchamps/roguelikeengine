export const intersection = <T>(sets: Array<Set<T>>): Set<T> => {
  if (!sets.length) return new Set();
  const i = sets.reduce((m, s, i) => (s.size < sets[m].size ? i : m), 0);
  const [smallest] = sets.splice(i, 1);
  const res = new Set<T>();
  for (let val of smallest) if (sets.every(s => s.has(val))) res.add(val);
  return res;
};
