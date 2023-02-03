import State from './store'
import { useNavigate } from '@solidjs/router'
import apiReq from './api'

// List of todos
const TodoList = () => {
  const [state, setState] = State
  const navigate = useNavigate()

  // Toggle todo status
  async function handleToggleStatus(id) {
    const updatedTodos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setState('todos', updatedTodos)

    const thisTodo = updatedTodos.filter((todo) => todo.id === id)
    // also update the database
    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: thisTodo[0].completed }),
    }
    const result = await apiReq(`/${id}`, reqObj)
  }

  // Delete todo
  async function deleteTodo(id) {
    const updatedTodos = state.todos.filter((todo) => todo.id !== id)
    setState('todos', updatedTodos)
    // also update the database
    const reqObj = {
      method: 'DELETE',
    }
    const result = await apiReq(`/${id}`, reqObj)
  }
  return (
    <ul>
      <For
        each={
          state.filterBy === null
            ? state.todos
            : state.todos.filter((todo) => todo.completed === state.filterBy)
        }
        fallback={<li>This list is empty!</li>}
      >
        {(todo, i) => (
          <li>
            <input
              class='peer'
              type='checkbox'
              checked={todo.completed}
              onChange={() => handleToggleStatus(todo.id)}
              name=''
              id={todo.id}
            />
            <label class='peer-checked:line-through'>{todo.task}</label>
            <button
              aria-label='Edit Todo'
              onClick={() => navigate(`/todo/${todo.id}`)}
            >
              <i class='far fa-edit  ml-2 text-blue-600'></i>
            </button>
            <button
              aria-label='Delete Todo'
              onClick={() => deleteTodo(todo.id)}
            >
              <i class='far fa-minus-square ml-2 text-red-800'></i>
            </button>
          </li>
        )}
      </For>
    </ul>
  )
}

export default TodoList
