export const intersect = <T>(a: T[], b: T[]) =>
  [...new Set(a)].filter((x) => new Set(b).has(x))
