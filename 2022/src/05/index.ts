import * as chalk from 'chalk'

import { readTextFile, transpose, Stack, IStack } from '../../lib'

const data = readTextFile(__dirname + '/input.txt')

type Schema = string
type Procedure = string

type CratesQty = string
type StackNumber = string

type CommandInput = `move ${CratesQty} from ${StackNumber} to ${StackNumber}`

type Command = {
  qty: number
  source: number
  target: number
}

type ExecutionConfig = {
  stacks: IStack<string>[]
  commands: Command[]
  keepOrder: boolean
}

const EMPTY_CRATE = 'X'

const createStacks = (crates: string[]) => {
  const rows = crates
    .reduceRight<string[][]>((accRow, currRow) => {
      const crates = currRow
        .split(' ')
        .reduce<string[]>((accCrate, currCrate, index) => {
          if (currCrate === '' && index % 4 === 0) {
            accCrate.push(EMPTY_CRATE)
          } else {
            accCrate.push(currCrate)
          }
          return accCrate
        }, [])
        .filter(Boolean)

      accRow.push(crates)
      return accRow
    }, [])
    .filter(Boolean)

  const stacksList: IStack<string>[] = []

  for (const row of transpose(rows)) {
    const stack = new Stack<string>()
    for (const value of row.filter((v) => v !== EMPTY_CRATE)) {
      stack.push(value)
    }
    stacksList.push(stack)
  }

  return stacksList
}

const createCommands = (commands: CommandInput[]) => {
  const commandsList: Command[] = []

  for (const command of commands) {
    const [, qty, , source, , target] = command.split(' ')
    commandsList.push({
      qty: +qty,
      source: +source,
      target: +target,
    })
  }

  return commandsList
}

const getConfig = (data: string) => {
  const [schema, procedures] = data.split('\n\n') as [Schema, Procedure]

  const lines = schema.split(/\r?\n/)
  const commands = procedures.split(/\r?\n/) as CommandInput[]

  const columns = lines[lines.length - 1]
  const rows = lines.filter((line) => line !== columns)

  return {
    stacks: createStacks(rows),
    commands: createCommands(commands),
  }
}

const executeCommands = (config: ExecutionConfig) => {
  const { stacks, commands, keepOrder } = config

  for (const command of commands) {
    const sourceCrates: string[] = []

    const sourceStack = stacks.find((_, index) => index + 1 === command.source)
    const targetStack = stacks.find((_, index) => index + 1 === command.target)

    if (sourceStack) {
      const sourceIndex = stacks.indexOf(sourceStack)
      for (let qty = 0; qty < command.qty; qty++) {
        const crate = stacks[sourceIndex].pop()
        if (crate) {
          sourceCrates.push(crate)
        }
      }
    }

    if (targetStack) {
      const crates = keepOrder ? sourceCrates.reverse() : sourceCrates
      const targetIndex = stacks.indexOf(targetStack)

      for (let i = 0; i < sourceCrates.length; i++) {
        stacks[targetIndex].push(crates[i])
      }
    }
  }
}

const getTopCrates = (stacks: IStack<string>[]) => {
  const topCratesList: string[] = []
  for (const stack of stacks) {
    const crate = stack.peek()
    if (crate) {
      topCratesList.push(crate)
    }
  }
  return topCratesList
}

const getMessage = (topCrates: string[]) =>
  topCrates.map((crate) => crate.replace('[', '').replace(']', '')).join('')

export const getPart1 = (data: string) => {
  const { stacks, commands } = getConfig(data)

  executeCommands({
    stacks,
    commands,
    keepOrder: false,
  })

  const topCrates = getTopCrates(stacks)
  return getMessage(topCrates)
}

export const getPart2 = (data: string) => {
  const { stacks, commands } = getConfig(data)

  executeCommands({
    stacks,
    commands,
    keepOrder: true,
  })

  const topCrates = getTopCrates(stacks)
  return getMessage(topCrates)
}

function main() {
  const part1 = getPart1(data)
  const part2 = getPart2(data)
  console.log(`Day 05 [Part 1]: ${chalk.yellow(part1)}`)
  console.log(`Day 05 [Part 2]: ${chalk.yellow(part2)}`)
}

main()
