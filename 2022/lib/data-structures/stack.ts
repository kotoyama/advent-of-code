import { Collection } from './collection'

export interface IStack<T> {
  push(item: T): void
  pop(): T | undefined
  peek(): T | undefined
}

export class Stack<T> extends Collection<T> implements IStack<T> {
  constructor(private capacity: number = Infinity) {
    super()
  }

  /**
   * adds an item to the stack
   */
  push(item: T) {
    if (this.isFull()) {
      throw Error('Stack has reached max capacity.')
    }
    this.storage.push(item)
  }

  /**
   * @returns the last added item and removes it from the stack
   */
  pop() {
    return this.storage.pop()
  }

  /**
   * @returns the last added item without removing it from the stack
   */
  peek() {
    return this.storage[this.size() - 1]
  }

  isFull() {
    return this.capacity === this.size()
  }
}
