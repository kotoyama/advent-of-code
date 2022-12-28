import { describe, expect, it } from 'vitest'

import { readTextFile } from '../../lib'
import { getLines, getPart1, getPart2 } from './index'

describe('Day ', () => {
  it('should return correct result for test data', () => {
    const data = readTextFile(__dirname + '/test.txt')
    const lines = getLines(data)

    const part1 = getPart1(lines)
    const part2 = getPart2(lines)

    expect(part1).eq(95437)
    expect(part2).eq(24933642)
  })

  it('should return correct result for input data', () => {
    const data = readTextFile(__dirname + '/input.txt')
    const lines = getLines(data)

    const part1 = getPart1(lines)
    const part2 = getPart2(lines)

    expect(part1).eq(1453349)
    expect(part2).eq(2948823)
  })
})
