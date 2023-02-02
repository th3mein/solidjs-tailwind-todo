import { lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'

const Main = lazy(() => import('./Main'))
const EditTodo = lazy(() => import('./EditTodo'))

function App() {
  return (
    <div class='container'>
      <Routes>
        <Route path='/' component={Main} />
        <Route path='/todo/:id' component={EditTodo} />
      </Routes>
    </div>
  )
}

export default App
