import { Maybe } from '../../../types'
import { Queue } from '../queue'
import { TreeNode } from './tree-node'

export interface ITree<T> {
  root: Maybe<TreeNode<T>>
  addChild(value: T, parent: TreeNode<T>): Maybe<TreeNode<T>>
  findNodeById(id: string, startNode?: TreeNode<T>): Maybe<TreeNode<T>>
  bfs(fn: (node: TreeNode<T>) => void, startNode?: TreeNode<T>): void
}

export class Tree<T> implements ITree<T> {
  protected _root: Maybe<TreeNode<T>> = null

  constructor(data: T) {
    this._root = new TreeNode<T>(data)
  }

  get root() {
    return this._root
  }

  addChild(value: T, parent: TreeNode<T>) {
    const parentNode = this.findNodeById(parent.id, parent)
    if (parentNode) {
      return parentNode.addChild(new TreeNode<T>(value))
    }
  }

  findNodeById(id: string, startNode: TreeNode<T> = this.root) {
    if (!this.root) return null

    let result: Maybe<TreeNode<T>> = null

    this.bfs((node) => {
      if (node && node.id === id) {
        result = node
      }
    }, startNode)
    return result
  }

  bfs(fn: (node: TreeNode<T>) => void, startNode: TreeNode<T> = this.root) {
    if (!this.root) return

    const queue = new Queue<TreeNode<T>>()
    queue.enqueue(startNode)

    while (!queue.isEmpty) {
      const node = queue.dequeue()
      fn(node)
      node.children.forEach((child) => queue.enqueue(child))
    }
  }
}
