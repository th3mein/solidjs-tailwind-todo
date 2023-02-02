import { createSignal } from 'solid-js'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import FilterByTabs from './FilterByTabs'

function Main() {
  return (
    <div class='main'>
      <AddTodoForm />
      <FilterByTabs />
      <TodoList />
    </div>
  )
}

export default Main
