class CookieUtils {
  #raw: string
  #map: Map<string, string>

  constructor(init: string | Record<string, string> | Map<string, string>) {
    this.#raw = ''
    this.cookie = init
  }
  set cookie(input: string | Record<string, string> | Map<string, string>) {
    this.#raw = typeof input === 'string' ? input : CookieUtils.stringify(input)
    this.#map = CookieUtils.parse(this.#raw)
  }
  get cookie(): string {
    return this.#raw
  }

  get(key?: string): string | Map<string, string> | null {
    return key ? this.#map.get(key) || null : this.#map
  }
  set(key: string, val: string) {
    this.#map.set(key, val)
    this.#raw = CookieUtils.stringify(this.#map)
    return this
  }
  delete(key: string) {
    this.#map.delete(key)
    this.#raw = CookieUtils.stringify(this.#map)
    return this
  }

  static parse(str = '') {
    const map = new Map()
    str.split(';').forEach((i) => {
      const arr = i.split('=')
      map.set(arr[0].trim(), arr.slice(1).join('=').trim())
    })
    return map
  }

  static stringify(obj: Record<string, string> | Map<string, string>) {
    obj = obj.constructor === Map ? Object.fromEntries(obj) : obj
    return Object.keys(obj)
      .map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])};`
      })
      .join(' ')
  }
}
