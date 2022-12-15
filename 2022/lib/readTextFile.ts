import * as fs from 'fs'

export function readTextFile(filePath: string) {
  return fs.readFileSync(filePath).toString()
}
