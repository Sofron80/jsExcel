import { $ } from '@core/dom'

export function resizeHandler(e, $root) {
  const $resizer = $(e.target)
  const $parent = $resizer.closest('[data-type="resizeable"]')
  const coords = $parent.getCoords()
  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
  const type = $resizer.data.resize
  let value

  const cssProp = type === 'col' ? 'bottom' : 'right'

  $resizer.css({
    opacity: 1,
    [cssProp]: '-5000px',
  })

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({ right: -delta + 'px' })
    } else {
      const delta = e.pageY - coords.bottom - window.pageYOffset
      value = coords.height + delta
      $resizer.css({ bottom: -delta + 'px' })
    }
  }

  document.onmouseup = e => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $parent.css({ width: value + 'px' })
      cells.forEach(el => $(el).css({ width: value + 'px' }))
    } else {
      $parent.css({ height: value + 'px' })
    }
    $resizer.css({
      opacity: null,
      bottom: 0,
      right: 0,
    })
  }
}
