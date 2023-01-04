import * as chalk from 'chalk'
import { nanoid } from 'nanoid'

import { readTextFile, get2DArrayColumn } from '../../lib'

const data = readTextFile(__dirname + '/input.txt')

type TreeInput = {
  id: string
  value: number
}

/**
 * left, right, top, bottom
 */
type Neighbors = [TreeInput[], TreeInput[], TreeInput[], TreeInput[]]

enum Direction {
  Left = 0,
  Right = 1,
  Top = 2,
  Bottom = 3,
}

type Tree = {
  id: string
  height: number
  isVisible: boolean
  neighbors: Neighbors
  scenicScore: number
}

const createGrid = (data: string[]) =>
  data.reduce<TreeInput[][]>((acc, curr) => {
    const line = curr.split('').map((v) => ({ id: nanoid(), value: +v }))
    acc.push(line)
    return acc
  }, [])

const createTrees = (grid: TreeInput[][]) =>
  grid.reduce<Tree[][]>((acc, currLine, _, lines) => {
    const line = currLine.map(({ id, value: height }, treeIndex, trees) => {
      const left = trees.slice(0, treeIndex)
      const right = trees.slice(treeIndex + 1, trees.length)

      const column = get2DArrayColumn(lines, treeIndex)
      const columnIndex = column.findIndex((tree) => tree.id === id)

      const top = column.slice(0, columnIndex)
      const bottom = column.slice(columnIndex + 1, trees.length)

      const neighbors = [left, right, top, bottom] as Neighbors

      const isVisible = neighbors.some(
        (tree) => !tree.length || tree.every((t) => t.value < height),
      )

      const scenicScore = calculateScenicScore(height, neighbors)

      return { id, height, isVisible, neighbors, scenicScore }
    })
    acc.push(line)
    return acc
  }, [])

export const getTrees = (data: string) => {
  const lines = data.split('\n')
  const grid = createGrid(lines)
  const trees = createTrees(grid)
  return trees
}

const getVisibleTrees = (trees: Tree[][]) =>
  trees.flat().reduce((acc, { isVisible }) => (isVisible ? acc + 1 : acc), 0)

const calculateScenicScore = (height: number, neighbors: Neighbors) => {
  const viewingDistances = neighbors.reduce<number[]>((acc, curr, index) => {
    let visibleTrees = 0

    if (curr.length > 0) {
      const directions = [Direction.Left, Direction.Top].includes(index)
        ? curr.reverse()
        : curr
      for (const tree of directions) {
        visibleTrees++
        if (tree.value >= height) {
          break
        }
      }
    }

    acc.push(visibleTrees)
    return acc
  }, [])

  return viewingDistances.reduce((a, b) => a * b, 1)
}

const getHighestScenicScore = (trees: Tree[][]) =>
  trees
    .flat()
    .reduce(
      (acc, { scenicScore }) => (scenicScore > acc ? scenicScore : acc),
      0,
    )

export const getPart1 = (trees: Tree[][]) => getVisibleTrees(trees)
export const getPart2 = (trees: Tree[][]) => getHighestScenicScore(trees)

function main() {
  const trees = getTrees(data)
  const part1 = getPart1(trees)
  const part2 = getPart2(trees)
  console.log(`Day 08 [Part 1]: ${chalk.yellow(part1)}`)
  console.log(`Day 08 [Part 2]: ${chalk.yellow(part2)}`)
}

main()
