import { Queue } from '../queue'
import { TreeNode } from './tree-node'

export interface ITree<T> {
  root: TreeNode<T>
  addChild(value: T, parent: TreeNode<T>): TreeNode<T>
  findNodeById(expected: string, startNode?: TreeNode<T>): TreeNode<T>
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

  /**
   * finds the node using a BFS approach
   */
  findNodeById(id: string, startNode: TreeNode<T> = this.root) {
    if (!this.root) return null

    const queue = new Queue<TreeNode<T>>()
    queue.enqueue(startNode)

    while (!queue.isEmpty) {
      const node = queue.dequeue()
      if (node && node.id === id) return node
      node.children.forEach((child) => queue.enqueue(child))
    }

    return null
  }
}
