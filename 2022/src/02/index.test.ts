import { describe, expect, it } from 'vitest'

import { readTextFile } from '../../lib'
import { getRounds, getPart1, getPart2 } from './index'
import type { RoundInput, Me, Result } from './index'

describe('Day 02', () => {
  it('should return correct result for test data', () => {
    const data = readTextFile(__dirname + '/test.txt')
    const rounds = getRounds(data)

    const part1 = getPart1(rounds as RoundInput<Me>[])

    expect(part1).eq(15)
  })

  it('should return correct result for input data', () => {
    const data = readTextFile(__dirname + '/input.txt')
    const rounds = getRounds(data)

    const part1 = getPart1(rounds as RoundInput<Me>[])
    const part2 = getPart2(rounds as RoundInput<Result>[])

    expect(part1).eq(14827)
    expect(part2).eq(13889)
  })
})
