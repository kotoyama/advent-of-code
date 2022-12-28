import { nanoid } from 'nanoid'

export interface ITreeNode<T> {
  id: string
  data: T
  parent: TreeNode<T>
  children: TreeNode<T>[]
  addChild(node: TreeNode<T>): this
}

export class TreeNode<T> implements ITreeNode<T> {
  protected _id: string
  protected _data: T
  protected _parent: TreeNode<T> | null = null
  protected _children: TreeNode<T>[] = []

  constructor(data: T, parent: TreeNode<T> | null = null) {
    this._id = nanoid()
    this._data = data
    this._parent = parent
  }

  get id() {
    return this._id
  }

  get data() {
    return this._data
  }

  get parent() {
    return this._parent
  }

  get children() {
    return this._children
  }

  /**
   * adds a node as a child
   */
  addChild(node: TreeNode<T>) {
    node._parent = this
    this.children.push(node)
    return this
  }
}
