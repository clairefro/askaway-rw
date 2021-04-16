const randomIntIncl = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const pluck = (arr) => {
  const i = randomIntIncl(0, arr.length)
  return arr[i]
}
