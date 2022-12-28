import { Collection } from './collection'

export interface IQueue<T> {
  enqueue(item: T): void
  dequeue(): T | undefined
  size: number
  isEmpty: boolean
}

export class Queue<T> extends Collection<T> implements IQueue<T> {
  constructor(private capacity = Infinity) {
    super()
  }

  /**
   * adds an item to the queue
   */
  enqueue(item: T) {
    if (this.isFull()) {
      throw Error('Queue has reached max capacity')
    }
    this._storage.push(item)
  }

  /**
   * retrieves an item from the queue
   */
  dequeue() {
    return this._storage.shift()
  }

  isFull() {
    return this.capacity === this.size
  }
}
