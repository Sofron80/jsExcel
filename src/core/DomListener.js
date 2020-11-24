import { capitalize } from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No root provided fo domListener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(list => {
      const method = getMethodName(list)
      if (!this[method]) {
        throw new Error(`Метод ${method} не реализован в ${this.name} `)
      }
      this[method] = this[method].bind(this)
      this.$root.on(list, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(list => {
      const method = getMethodName(list)

      this.$root.off(list, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
