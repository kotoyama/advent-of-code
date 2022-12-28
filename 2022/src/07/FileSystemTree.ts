import { Queue, ITree, Tree, TreeNode } from '../../lib'

type BaseNode = {
  name: string
  size: number
}

export type DirectoryNode = {
  type: 'directory'
} & BaseNode

export type FileNode = {
  type: 'file'
} & BaseNode

export type FileSystemNode = FileNode | DirectoryNode

export interface IFileSystemTree extends ITree<FileSystemNode> {
  addFile(
    file: FileNode,
    parent: TreeNode<FileSystemNode>,
  ): TreeNode<FileSystemNode>
  findDirectory(
    dir: string,
    ...children: TreeNode<FileSystemNode>[]
  ): TreeNode<FileSystemNode>
  sumDirectoriesUnder(limit: number): number
}

export class FileSystemTree
  extends Tree<FileSystemNode>
  implements IFileSystemTree
{
  constructor(data: FileSystemNode) {
    super(data)
  }

  addFile(file: FileNode, parent: TreeNode<FileSystemNode>) {
    const parentNode = this.findNodeById(parent.id, parent)
    if (parentNode) {
      let currentNode: TreeNode<FileSystemNode> = parent

      while (currentNode) {
        currentNode.data.size += file.size
        currentNode = currentNode.parent
      }
      return parentNode.addChild(new TreeNode<FileSystemNode>(file))
    }
  }

  findDirectory(dir: string, ...children: TreeNode<FileSystemNode>[]) {
    if (!this.root) return null

    const queue = new Queue<TreeNode<FileSystemNode>>()
    children.forEach((child) => queue.enqueue(child))

    while (!queue.isEmpty) {
      const node = queue.dequeue()
      if (node && node.data.name === dir && node.data.type === 'directory') {
        return node
      }
      node.children.forEach((child) => queue.enqueue(child))
    }

    return null
  }

  sumDirectoriesUnder(limit: number) {
    if (!this.root) return 0

    let sum = 0

    const queue = new Queue<TreeNode<FileSystemNode>>()
    queue.enqueue(this.root)

    while (!queue.isEmpty) {
      const node = queue.dequeue()
      if (node && node.data.type === 'directory' && node.data.size <= limit) {
        sum += node.data.size
      }
      node.children.forEach((child) => queue.enqueue(child))
    }
    return sum
  }
}
