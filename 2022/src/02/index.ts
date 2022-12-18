import * as chalk from 'chalk'

import { readTextFile } from '../../lib'

const data = readTextFile(__dirname + '/input.txt')

enum Opponent {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

export enum Me {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z',
}

enum ShapeScore {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

enum RoundScore {
  Win = 6,
  Draw = 3,
}

export type RoundInput<T extends string> = `${Opponent} ${T}`
type Round<T> = [Opponent, T]

const getRound = <T extends string>(input: RoundInput<T>) =>
  input.split(' ') as Round<T>

export const getRounds = (data: string) => data.split('\n')

const isRoundDraw = (round: Round<Me>) => {
  const [opponent, me] = round
  const isRock = opponent === Opponent.Rock && me === Me.Rock
  const isPaper = opponent === Opponent.Paper && me === Me.Paper
  const isScissors = opponent === Opponent.Scissors && me === Me.Scissors
  return isRock || isPaper || isScissors
}

const isRoundWin = (round: Round<Me>) => {
  const [opponent, me] = round
  const isScissorsToPaper = me === Me.Scissors && opponent === Opponent.Paper
  const isPaperToRock = me === Me.Paper && opponent === Opponent.Rock
  const isRockToScissors = me === Me.Rock && opponent === Opponent.Scissors
  return isScissorsToPaper || isPaperToRock || isRockToScissors
}

const getShapeScore = (round: Round<Me>) => {
  let result = 0
  const [, me] = round

  switch (me) {
    case Me.Rock:
      result += ShapeScore.Rock
      break
    case Me.Paper:
      result += ShapeScore.Paper
      break
    case Me.Scissors:
      result += ShapeScore.Scissors
      break
  }

  return result
}

const getRoundScore = (round: Round<Me>) => {
  let result = 0

  if (isRoundWin(round)) {
    result += RoundScore.Win
  }

  if (isRoundDraw(round)) {
    result += RoundScore.Draw
  }

  return result
}

const getScore = (round: Round<Me>) => {
  const roundScore = getRoundScore(round)
  const shapeScore = getShapeScore(round)
  return roundScore + shapeScore
}

export const getPart1 = (rounds: RoundInput<Me>[]) => {
  return rounds.reduce((acc, curr) => {
    const round = getRound<Me>(curr)
    const score = getScore(round)
    return acc + score
  }, 0)
}

export enum Result {
  Loss = 'X',
  Draw = 'Y',
  Win = 'Z',
}

const getLossResult = (opponent: Opponent) => {
  switch (opponent) {
    case Opponent.Paper:
      return Me.Rock
    case Opponent.Rock:
      return Me.Scissors
    case Opponent.Scissors:
      return Me.Paper
  }
}

const getDrawResult = (opponent: Opponent) => {
  switch (opponent) {
    case Opponent.Paper:
      return Me.Paper
    case Opponent.Rock:
      return Me.Rock
    case Opponent.Scissors:
      return Me.Scissors
  }
}

const getWinResult = (opponent: Opponent) => {
  switch (opponent) {
    case Opponent.Paper:
      return Me.Scissors
    case Opponent.Rock:
      return Me.Paper
    case Opponent.Scissors:
      return Me.Rock
  }
}

const getShape = (round: Round<Result>) => {
  const [opponent, result] = round

  switch (result) {
    case Result.Loss:
      return getLossResult(opponent)
    case Result.Draw:
      return getDrawResult(opponent)
    case Result.Win:
      return getWinResult(opponent)
  }
}

export const getPart2 = (rounds: RoundInput<Result>[]) => {
  return rounds.reduce((acc, curr) => {
    const round = getRound<Result>(curr)
    const me = getShape(round)
    const [opponent] = round
    const score = getScore([opponent, me])
    return acc + score
  }, 0)
}

function main() {
  const rounds = getRounds(data)
  const part1 = getPart1(rounds as RoundInput<Me>[])
  const part2 = getPart2(rounds as RoundInput<Result>[])
  console.log(`Day 02 [Part 1]: ${chalk.yellow(part1)}`)
  console.log(`Day 02 [Part 2]: ${chalk.yellow(part2)}`)
}

main()
