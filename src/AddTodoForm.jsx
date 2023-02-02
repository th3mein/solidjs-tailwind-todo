import { createSignal } from 'solid-js'
import State from './store'

// Add Todo Form
const AddTodoForm = () => {
  const [state, setState] = State
  const [newTodo, setNewTodo] = createSignal('')

  // Add todo
  function addTodo(e) {
    e.preventDefault()
    const id = state.todos.length
      ? state.todos[state.todos.length - 1].id + 1
      : 1
    const newItem = { id, task: newTodo(), completed: false }
    setState('todos', [...state.todos, newItem])
    setNewTodo('')
  }

  return (
    <form onSubmit={addTodo} class='mb-4'>
      <label for='addTodo'>Add Todo</label>
      <input
        type='text'
        id='addTodo'
        autofocus
        required
        placeholder='e.g. Buy milk'
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo()}
      />
    </form>
  )
}

export default AddTodoForm
