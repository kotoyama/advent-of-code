export const chunk = <T>(data: T[], size: number): T[][] => {
  const result: T[][] = []
  for (let i = 0, j = data.length; i < j; i += size) {
    result.push(data.slice(i, i + size))
  }
  return result
}
