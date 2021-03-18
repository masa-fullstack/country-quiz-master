type RandomSort = <T>(array: T[]) => T[]

export const randomSort: RandomSort = (array) => {
  // array.reduce((sorted, value, i) => {
  //   const j = Math.floor(Math.random() * i)
  //   console.log(i)
  //   if (j === i) {
  //     return [...sorted, value]
  //   } else {
  //     return [...sorted.slice(0, j), value, ...sorted.slice(j)]
  //   }
  // }, [])

  for (let i = array.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    const tmp = array[i]
    array[i] = array[r]
    array[r] = tmp
  }
  return array
}
