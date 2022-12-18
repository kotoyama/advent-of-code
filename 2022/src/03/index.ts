import * as chalk from 'chalk'

import { chunk, readTextFile } from '../../lib'

const data = readTextFile(__dirname + '/input.txt')

const content = data.split('\n')

const createAlphabet = (capitalize: boolean) =>
  [...Array(26)].map((_, i) => String.fromCharCode(i + (capitalize ? 65 : 97)))

const createItems = (uppercase: boolean) =>
  createAlphabet(uppercase).map((char, i) => ({
    item: char,
    priority: i + (uppercase ? 27 : 1),
  }))

const items = [...createItems(false), ...createItems(true)]

type FirstCompartment = string
type SecondCompartment = string

type Rucksack = string
type Group = [Rucksack, Rucksack, Rucksack]

type Compartments = [FirstCompartment, SecondCompartment]

const getCompartments = (rucksack: Rucksack) => {
  const capacity = rucksack.length
  const firstCompartment = rucksack.slice(0, capacity / 2)
  const secondCompartment = rucksack.slice(capacity / 2, capacity)
  return [firstCompartment, secondCompartment] as Compartments
}

const getCommonItemInRucksack = (compartments: Compartments) => {
  const [first, second] = compartments

  for (const char of first) {
    if (second.includes(char)) {
      return char
    }
  }
}

const getPriority = (item?: string) =>
  items.find((v) => v.item === item)?.priority ?? 0

const getCommonItemInGroup = (group: Group) => {
  const [first, ...rest] = group.sort((a, b) => a.length - b.length)

  for (const char of first) {
    if (rest.every((roucksack) => roucksack.includes(char))) {
      return char
    }
  }
}

const getPart1 = () => {
  return content.reduce((acc, curr) => {
    const compartments = getCompartments(curr)
    const common = getCommonItemInRucksack(compartments)
    const priority = getPriority(common)
    return acc + priority
  }, 0)
}

const getPart2 = () => {
  const chunks = chunk(content, 3) as Group[]
  return chunks.reduce((acc, curr) => {
    const common = getCommonItemInGroup(curr)
    const priority = getPriority(common)
    return acc + priority
  }, 0)
}

function main() {
  const part1 = getPart1()
  const part2 = getPart2()
  console.log(`03 Day [Part 1]: ${chalk.yellow(part1)}`)
  console.log(`03 Day [Part 2]: ${chalk.yellow(part2)}`)
}

main()
