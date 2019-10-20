export default {
  name: 'world',
  immediate: true,
  components: [
    {
      name: 'World',
    },
    {
      name: 'Bounds',
      init: {
        minX: 0,
        maxX: 500,
        minY: 0,
        maxY: 1000,
      },
    },
  ],
}
