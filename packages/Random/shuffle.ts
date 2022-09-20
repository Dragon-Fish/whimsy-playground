const mul = 0x19660d
const inc = 0x3c6ef35f
const eps = 1 / 0x100000000

// Linear Congruential Generator
export function lcg(seed = Math.random()) {
  let state = (0 <= seed && seed < 1 ? seed / eps : Math.abs(seed)) | 0
  return () => ((state = (mul * state + inc) | 0), eps * (state >>> 0))
}

export function shuffle<T>(
  array: T[],
  i0 = 0,
  i1 = array.length,
  seed = Math.random()
) {
  const random = lcg(seed)
  let m = i1 - (i0 = +i0)
  while (m) {
    const i = (random() * m--) | 0,
      t = array[m + i0]
    array[m + i0] = array[i + i0]
    array[i + i0] = t
  }
  return array
}
