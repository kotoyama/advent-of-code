export abstract class Collection<T> {
  protected _storage: T[] = []

  get size() {
    return this._storage.length
  }

  get isEmpty() {
    return this._storage.length === 0
  }

  abstract isFull(): boolean
}
