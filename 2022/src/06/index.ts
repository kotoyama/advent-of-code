import * as chalk from 'chalk'

import { readTextFile } from '../../lib'

const data = readTextFile(__dirname + '/input.txt')

const findMarkerStartIndex = (datastream: string, sequenceSize: number) => {
  const sequence = []
  for (let i = 0; i < datastream.length; i++) {
    sequence.push(datastream[i])
    if (sequence.length === sequenceSize) {
      const uniqueSequence = new Set(sequence)
      if (uniqueSequence.size === sequenceSize) {
        return i + 1
      }
      sequence.shift()
    }
  }
  return -1
}

export const getPart1 = (data: string) => findMarkerStartIndex(data, 4)
export const getPart2 = (data: string) => findMarkerStartIndex(data, 14)

function main() {
  const part1 = getPart1(data)
  const part2 = getPart2(data)
  console.log(`Day 06 [Part 1]: ${chalk.yellow(part1)}`)
  console.log(`Day 06 [Part 2]: ${chalk.yellow(part2)}`)
}

main()
