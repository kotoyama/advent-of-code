import { describe, expect, it } from 'vitest'

import { readTextFile } from '../../lib'
import { getPart1, getPart2 } from './index'

describe('Day 06', () => {
  it('should return correct result for test data', () => {
    const data = readTextFile(__dirname + '/test.txt')

    const part1 = getPart1(data)
    const part2 = getPart2(data)

    expect(part1).eq(7)
    expect(part2).eq(19)
  })

  it('should return correct result for input data', () => {
    const data = readTextFile(__dirname + '/input.txt')

    const part1 = getPart1(data)
    const part2 = getPart2(data)

    expect(part1).eq(1100)
    expect(part2).eq(2421)
  })
})
