export function getRandNum(max: number): number {
  return Math.floor(Math.random() * max)
}
    
export function getRandArrItem<T>(arr: T[]): T {
  return arr[getRandNum(arr.length)]
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}