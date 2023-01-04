import * as chalk from 'chalk'

import { readTextFile } from '../../lib'

const data = readTextFile(__dirname + '/input.txt')

export const getChunks = (data: string) =>
  data.split('\n\n').map((chunk) => chunk.split('\n').map(Number))

const getSum = (chunk: number[]) => {
  return chunk.reduce((acc, curr) => acc + curr, 0)
}

export const getPart1 = (chunks: number[][]) => {
  return chunks.reduce((acc, curr) => {
    const chunkSum = getSum(curr)
    if (acc < chunkSum) {
      return chunkSum
    }
    return acc
  }, 0)
}

export const getPart2 = (chunks: number[][]) => {
  const top3Elves = chunks
    .reduce((acc, curr) => {
      const chunkSum = getSum(curr)
      acc.push(chunkSum)
      return acc
    }, [])
    .sort((a, b) => b - a)
    .slice(0, 3)
  return getSum(top3Elves)
}

function main() {
  const chunks = getChunks(data)
  const part1 = getPart1(chunks)
  const part2 = getPart2(chunks)
  console.log(`Day 01 [Part 1]: ${chalk.yellow(part1)}`)
  console.log(`Day 01 [Part 2]: ${chalk.yellow(part2)}`)
}

main()
