export const empty2dArray = (rows: number, cols: number, value: number | null = null) =>
  Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(value));

export const iterate2dArray = (
  arr: Array<Array<any>>,
  nRows: number,
  nCols: number,
  iterator: Function,
) => {
  for (let row = 0; row < nRows - 1; row += 1) {
    for (let col = 0; col < nCols; col += 1) {
      const index = col * nCols + row;
      const element = arr[row][col];

      iterator(element, index);
    }
  }
};
