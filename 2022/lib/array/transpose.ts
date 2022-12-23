export const transpose = <T>(matrix: T[][]): T[][] =>
  matrix[0].map((_, index) => matrix.map((row) => row[index]))
