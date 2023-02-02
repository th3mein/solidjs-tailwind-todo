import { createSignal } from 'solid-js'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import FilterByTabs from './FilterByTabs'

function App() {
  return (
    <div class='container'>
      <AddTodoForm />
      <FilterByTabs />
      <TodoList />
    </div>
  )
}

export default App
