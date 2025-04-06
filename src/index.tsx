import { root } from '@lynx-js/react'

import { TodoApp } from './TodoApp.js'

root.render(<TodoApp />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
