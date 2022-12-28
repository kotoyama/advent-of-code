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
  findDirectoryChild(
    dir: string,
    ...children: TreeNode<FileSystemNode>[]
  ): TreeNode<FileSystemNode>
  sumDirectorySizesUnder(limit: number): number
  findDirectorySizeForDeletion(): number
}

const TOTAL_DISK_SPACE_AVAILABLE = 70_000_000
const DISK_SPACE_NEEDED_FOR_UPDATE = 30_000_000

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

  findDirectoryChild(dir: string, ...children: TreeNode<FileSystemNode>[]) {
    if (!this.root) return null

    const queue = new Queue<TreeNode<FileSystemNode>>()
    children.forEach((child) => queue.enqueue(child))

    while (!queue.isEmpty) {
      const node = queue.dequeue()
      if (node && node.data.type === 'directory' && node.data.name === dir) {
        return node
      }
      node.children.forEach((child) => queue.enqueue(child))
    }

    return null
  }

  sumDirectorySizesUnder(limit: number) {
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

  findDirectorySizeForDeletion() {
    if (!this.root) return 0

    const REMAINING_SPACE_REQUIRED =
      DISK_SPACE_NEEDED_FOR_UPDATE -
      (TOTAL_DISK_SPACE_AVAILABLE - this.root.data.size)

    const queue = new Queue<TreeNode<FileSystemNode>>()
    queue.enqueue(this.root)

    let min = TOTAL_DISK_SPACE_AVAILABLE

    while (!queue.isEmpty) {
      const node = queue.dequeue()
      if (
        node &&
        node.data.type === 'directory' &&
        node.data.size >= REMAINING_SPACE_REQUIRED
      ) {
        min = Math.min(node.data.size, min)
      }
      node.children.forEach((child) => queue.enqueue(child))
    }

    return min
  }
}
