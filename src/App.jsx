import { createSignal } from 'solid-js'

function App() {
  const [todos, setTodos] = createSignal([
    {
      id: 1,
      task: 'Cook soup',
      completed: true,
    },
    {
      id: 2,
      task: 'Blow soup',
      completed: false,
    },
    {
      id: 3,
      task: 'Eat soup',
      completed: false,
    },
  ])

  const [filterBy, setFilterBy] = createSignal(null)

  const [newTodo, setNewTodo] = createSignal('')

  // Todo list
  const TodoList = () => {
    return (
      <ul>
        <For
          each={
            filterBy() === null
              ? todos()
              : todos().filter((todo) => todo.completed === filterBy())
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

  // Filters
  const FilterByTabs = () => {
    return (
      <ul class='list-filter'>
        <li>
          <a
            onClick={() => setFilterBy(null)}
            href='#'
            class={`${filterBy() === null ? 'current-filter' : 'filter'} `}
          >
            <i class='fas fa-frown-open mr-3 '></i>
            <span class='pb-1 md:pb-0 text-sm'>All</span>
          </a>
        </li>
        <li>
          <a
            onClick={() => setFilterBy(true)}
            href='#'
            class={`${filterBy() ? 'current-filter' : 'filter'} `}
          >
            <i class='fas fa-grin-beam-sweat mr-3 '></i>
            <span class='pb-1 md:pb-0 text-sm'>Completed</span>
          </a>
        </li>
        <li>
          <a
            onClick={() => setFilterBy(false)}
            href='#'
            class={`${filterBy() === false ? 'current-filter' : 'filter'} `}
          >
            <i class='fa fa-grin-tongue-squint mr-3'></i>
            <span class='pb-1 md:pb-0 text-sm'>Pending</span>
          </a>
        </li>
      </ul>
    )
  }

  // Add Todo Form
  const AddTodoForm = () => {
    return (
      <form onSubmit={addTodo} class='mb-4'>
        <label class='absolute left-[-999px]' for='addTodo'>
          Add Todo
        </label>
        <input
          class='new-todo'
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

  // Toggle todo status
  function handleToggleStatus(id) {
    const updatedTodos = todos().map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updatedTodos)
  }

  // Delete todo
  function deleteTodo(id) {
    const updatedTodos = todos().filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  // Add todo
  function addTodo(e) {
    e.preventDefault()
    const id = todos().length ? todos()[todos().length - 1].id + 1 : 1
    const newItem = { id, task: newTodo(), completed: false }
    setTodos([...todos(), newItem])
    setNewTodo('')
  }

  return (
    <div class='container'>
      <AddTodoForm />
      <FilterByTabs />
      <TodoList />
    </div>
  )
}

export default App
