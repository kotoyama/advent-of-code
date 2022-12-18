import { describe, expect, it } from 'vitest'

import { readTextFile } from '../../lib'
import { getChunks, getPart1, getPart2 } from './index'

describe('Day 01', () => {
  it('should return correct result for test data', () => {
    const data = readTextFile(__dirname + '/test.txt')
    const chunks = getChunks(data)

    const part1 = getPart1(chunks)

    expect(part1).eq(24000)
  })

  it('should return correct result for input data', () => {
    const data = readTextFile(__dirname + '/input.txt')
    const chunks = getChunks(data)

    const part1 = getPart1(chunks)
    const part2 = getPart2(chunks)

    expect(part1).eq(69177)
    expect(part2).eq(207456)
  })
})
