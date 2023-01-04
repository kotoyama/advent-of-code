import { describe, expect, it } from 'vitest'

import { readTextFile } from '../../lib'
import { getTrees, getPart1, getPart2 } from './index'

describe('Day 08', () => {
  it('should return correct result for test data', () => {
    const data = readTextFile(__dirname + '/test.txt')
    const trees = getTrees(data)

    const part1 = getPart1(trees)
    const part2 = getPart2(trees)

    expect(part1).eq(21)
    expect(part2).eq(8)
  })

  it('should return correct result for input data', () => {
    const data = readTextFile(__dirname + '/input.txt')
    const trees = getTrees(data)

    const part1 = getPart1(trees)
    const part2 = getPart2(trees)

    expect(part1).eq(1779)
    expect(part2).eq(172224)
  })
})
