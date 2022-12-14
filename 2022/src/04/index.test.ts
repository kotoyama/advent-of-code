import { describe, expect, it } from 'vitest'

import { readTextFile } from '../../lib'
import { getContent, getPart1, getPart2 } from './index'

describe('Day 04', () => {
  it('should return correct result for test data', () => {
    const data = readTextFile(__dirname + '/test.txt')
    const content = getContent(data)

    const part1 = getPart1(content)
    const part2 = getPart2(content)

    expect(part1).eq(2)
    expect(part2).eq(4)
  })

  it('should return correct result for input data', () => {
    const data = readTextFile(__dirname + '/input.txt')
    const content = getContent(data)

    const part1 = getPart1(content)
    const part2 = getPart2(content)

    expect(part1).eq(530)
    expect(part2).eq(903)
  })
})
