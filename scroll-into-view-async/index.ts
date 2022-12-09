export function scrollIntoViewAsync(
  target: Element | null,
  options?: ScrollIntoViewOptions,
  lockBody = false
) {
  if (!target) {
    return Promise.resolve()
  }
  return new Promise((resolve) => {
    let same = 0
    let lastPos: number
    const style = document.body.style
    lockBody && (style.overflow = 'hidden')
    target.scrollIntoView({ behavior: 'smooth', ...options })
    const check = () => {
      const newPos = target.getBoundingClientRect().top
      if (newPos === lastPos) {
        if (same++ > 2) {
          lockBody && (style.overflow = '')
          return resolve(true)
        }
      } else {
        same = 0
        lastPos = newPos
      }
      requestAnimationFrame(check)
    }
    requestAnimationFrame(check)
  })
}
