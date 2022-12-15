import * as chalk from 'chalk'

import { readTextFile } from '../../lib'

const data = readTextFile(__dirname + '/input.txt')

const chunks = data
  .split('\n\n')
  .map((chunk) => chunk.split('\n').map((str) => Number(str)))

const getSum = (chunk: number[]) => {
  return chunk.reduce((acc, curr) => acc + curr, 0)
}

const getPart1 = () => {
  return chunks.reduce((acc, curr) => {
    const chunkSum = getSum(curr)
    if (acc < chunkSum) {
      return chunkSum
    }
    return acc
  }, 0)
}

const getPart2 = () => {
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
  const part1 = getPart1()
  const part2 = getPart2()
  console.log(`01 Day [Part 1]: ${chalk.yellow(part1)}`)
  console.log(`01 Day [Part 2]: ${chalk.yellow(part2)}`)
}

main()
