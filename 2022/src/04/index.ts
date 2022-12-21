import * as chalk from 'chalk'

import { range, intersect, readTextFile } from '../../lib'

const data = readTextFile(__dirname + '/input.txt')

export const getContent = (data: string) => data.split('\n')

type SectionsRange = number[]
type PairSections = [SectionsRange, SectionsRange]

const getPairSections = (pair: string) =>
  pair
    .split(',')
    .map((sections) => sections.split('-'))
    .map(([start, end]) => range(+start, +end)) as PairSections

const getPairIntersection = ([range1, range2]: PairSections) =>
  intersect(range1, range2)

const hasFullOverlap = (sections: PairSections) => {
  const [range1, range2] = sections
  const intersection = getPairIntersection(sections)

  if (!intersection.length) {
    return false
  }

  return (
    range1.every((section) => intersection.includes(section)) ||
    range2.every((section) => intersection.includes(section))
  )
}

export const getPart1 = (content: string[]) => {
  return content.reduce((acc, curr) => {
    const sections = getPairSections(curr)

    if (hasFullOverlap(sections)) {
      return acc + 1
    }

    return acc
  }, 0)
}

export const getPart2 = (content: string[]) => {
  return content.reduce((acc, curr) => {
    const sections = getPairSections(curr)
    const intersection = getPairIntersection(sections)

    if (intersection.length > 0) {
      return acc + 1
    }

    return acc
  }, 0)
}

function main() {
  const content = getContent(data)
  const part1 = getPart1(content)
  const part2 = getPart2(content)
  console.log(`Day 04 [Part 1]: ${chalk.yellow(part1)}`)
  console.log(`Day 04 [Part 2]: ${chalk.yellow(part2)}`)
}

main()
