import * as chalk from 'chalk'

import { readTextFile, TreeNode } from '../../lib'
import {
  FileNode,
  DirectoryNode,
  FileSystemNode,
  FileSystemTree,
} from './FileSystemTree'

const data = readTextFile(__dirname + '/input.txt')

export const getLines = (data: string) =>
  data.split('\n').filter((item) => !!item)

type Directory<Name extends string> = `dir ${Name}`
type File<Size extends string, Name extends string> = `${Size} ${Name}`

type BaseCommand<Action extends string, Args = undefined> = Args extends string
  ? `$ ${Action} ${Args}`
  : `$ ${Action}`

type ChangeDirectoryMoveIn<Name> = Name
type ChangeDirectoryMoveOut = '..'
type ChangeDirectorySwitch = '/'

type ChangeDirectoryMoveInCommand<Args> = BaseCommand<
  'cd',
  ChangeDirectoryMoveIn<Args>
>
type ChangeDirectoryMoveOutCommand = BaseCommand<'cd', ChangeDirectoryMoveOut>
type ChangeDirectorySwitchCommand = BaseCommand<'cd', ChangeDirectorySwitch>

type ChangeDirectoryCommand<Args> =
  | ChangeDirectoryMoveInCommand<Args>
  | ChangeDirectoryMoveOutCommand
  | ChangeDirectorySwitchCommand

type ListCommand = BaseCommand<'ls'>

type Command<Args> = ListCommand | ChangeDirectoryCommand<Args>

const isCommand = <Args>(line: string): line is Command<Args> =>
  line.startsWith('$')

const isDirectory = <Name extends string>(
  line: string,
): line is Directory<Name> => line.startsWith('dir')

const isFile = <Size extends string, Name extends string>(
  line: string,
): line is File<Size, Name> => {
  const [size] = line.split(' ')
  return !Number.isNaN(+size)
}

const isListCommand = <Args>(
  command: Command<Args>,
): command is ListCommand => {
  const [, action] = command.split(' ')
  return action === 'ls'
}

const isChangeDirectoryMoveOutCommand = <Args>(
  command: ChangeDirectoryCommand<Args>,
): command is ChangeDirectoryMoveOutCommand => {
  const [, , argument] = command.split(' ')
  return argument === '..'
}

const isChangeDirectorySwitchCommand = <Args>(
  command: ChangeDirectoryCommand<Args>,
): command is ChangeDirectorySwitchCommand => {
  const [, , argument] = command.split(' ')
  return argument === '/'
}

const isChangeDirectoryMoveInCommand = <Args>(
  command: ChangeDirectoryCommand<Args>,
): command is ChangeDirectoryMoveInCommand<Args> => {
  const [, , argument] = command.split(' ')
  return argument !== '/' && argument !== '..'
}

const changeDirectoryCommand = <Args>(
  command: ChangeDirectoryCommand<Args>,
  tree: FileSystemTree | null,
  currentDir: TreeNode<FileSystemNode> | null,
) => {
  if (isChangeDirectorySwitchCommand(command)) {
    const root: DirectoryNode = { type: 'directory', name: '/', size: 0 }
    const tree = new FileSystemTree(root)
    return { tree, currentDir: tree.root }
  }

  if (isChangeDirectoryMoveOutCommand(command)) {
    return { currentDir: currentDir.parent }
  }

  if (isChangeDirectoryMoveInCommand(command)) {
    const [, , dir] = command.split(' ')
    return {
      currentDir: tree.findDirectory(dir, ...currentDir.children),
    }
  }
}

const createFileSystemTree = (lines: string[]) => {
  let tree: FileSystemTree | null = null
  let currentDir: TreeNode<FileSystemNode> | null = null

  for (const line of lines) {
    if (isCommand(line)) {
      if (isListCommand(line)) {
        continue
      } else {
        const result = changeDirectoryCommand(line, tree, currentDir)
        currentDir = result.currentDir
        if (result.tree) tree = result.tree
      }
    }

    if (isDirectory(line)) {
      const [, dir] = line.split(' ')
      const directory: DirectoryNode = { type: 'directory', name: dir, size: 0 }
      tree.addChild(directory, currentDir)
    }

    if (isFile(line)) {
      const [size, name] = line.split(' ')
      const file: FileNode = { type: 'file', name: `file_${name}`, size: +size }
      tree.addFile(file, currentDir)
    }
  }

  return tree
}

export const getPart1 = (lines: string[]) => {
  const tree = createFileSystemTree(lines)
  return tree.sumDirectoriesUnder(100_000)
}

export const getPart2 = (lines: string[]) => {}

function main() {
  const lines = getLines(data)
  const part1 = getPart1(lines)
  const part2 = getPart2(lines)
  console.log(`Day 07 [Part 1]: ${chalk.yellow(part1)}`)
  console.log(`Day 07 [Part 2]: ${chalk.yellow(part2)}`)
}

main()
