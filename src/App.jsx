import { lazy, onMount } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import State from './store'
import apiReq from './api'

const Main = lazy(() => import('./Main'))
const EditTodo = lazy(() => import('./EditTodo'))

function App() {
  const [state, setState] = State

  onMount(async () => {
    const data = await apiReq('')
    setState('todos', data.data)
  })
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
