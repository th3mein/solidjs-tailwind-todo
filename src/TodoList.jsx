import State from './store'

// List of todos

const TodoList = () => {
  const [state, setState] = State

  // Toggle todo status
  function handleToggleStatus(id) {
    const updatedTodos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setState('todos', updatedTodos)
  }

  // Delete todo
  function deleteTodo(id) {
    const updatedTodos = state.todos.filter((todo) => todo.id !== id)
    setState('todos', updatedTodos)
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
          <li class='todo-item'>
            <input
              class='peer'
              type='checkbox'
              checked={todo.completed}
              onChange={() => handleToggleStatus(todo.id)}
              name=''
              id={todo.id}
            />
            <label class='block flex-1 px-5 peer-checked:line-through'>
              {todo.task}
            </label>
            <button aria-label='Edit Todo'>
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
