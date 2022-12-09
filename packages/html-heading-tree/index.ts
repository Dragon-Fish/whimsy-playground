export interface Heading {
  text: string
  id: string
  level: number
  children: Heading[]
}

export function parseTocTree(headingElements: Element[] | NodeListOf<Element>) {
  const toc: Heading[] = []
  headingElements.forEach((i) => {
    const heading = makeHeading(i)
    getParent(heading.level, toc).push(heading)
  })
  return toc
}

export function makeHeading(el: Element): Heading {
  el.querySelector('.mw-editsection')?.remove()
  const level = +el.tagName.substring(1)
  const text =
    el.querySelector('.mw-headline')?.textContent || el.textContent || ''
  let id = el.querySelector('[id]')?.id || el.id
  if (!id) {
    id = nanoid()
    const span = document.createElement('span')
    span.id = id
    el.insertAdjacentElement('afterbegin', span)
  }
  return { level, id, text, children: [] }
}

function getParent(level: number, parent: Heading[]): Heading[] {
  const last = parent[parent.length - 1]
  if (!last || level <= last.level) {
    return parent
  } else {
    return getParent(level, last.children)
  }
}

function nanoid(t = 21) {
  return crypto
    .getRandomValues(new Uint8Array(t))
    .reduce(
      (t, e) =>
        (t +=
          (e &= 63) < 36
            ? e.toString(36)
            : e < 62
            ? (e - 26).toString(36).toUpperCase()
            : e > 62
            ? '-'
            : '_'),
      ''
    )
}
