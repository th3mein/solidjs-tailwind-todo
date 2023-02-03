import State from './store'
import { Show, createSignal, createEffect } from 'solid-js'
import { unwrap } from 'solid-js/store'
import apiReq from './api'
import { useParams, useNavigate, A } from '@solidjs/router'
const EditTodo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [state, setState] = State

  const [todo, setTodo] = createSignal(
    unwrap(state.todos).filter((todo) => todo.id === Number(id))
  )

  async function saveChanges(e) {
    e.preventDefault()
    const updatedTodos = state.todos.map((todoItem) =>
      todoItem.id === Number(id) ? todo()[0] : todoItem
    )
    setState('todos', updatedTodos)
    // also update the database
    const reqObj = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo()[0]),
    }
    const result = await apiReq(`/${id}`, reqObj)
    console.log(result)
  }

  return (
    <div class='edit-form'>
      <h1> Edit Todo</h1>
      <Show
        when={todo().length}
        fallback={
          <>
            <h1>Aren't you a cheeky fella!</h1>
            <button
              class='text-gray-600 bg-blue-400 border-blue-400 border-solid border-4 rounded-md mt-4'
              onClick={() => navigate('/')}
            >
              Go back
            </button>
          </>
        }
      >
        <form onSubmit={saveChanges}>
          <ul>
            <li>
              <label>Id: {todo()[0].id}</label>
            </li>
            <li>
              <label>Task : </label>{' '}
              <input
                type='text'
                name='task'
                id='task'
                required
                onchange={(e) => {
                  setTodo([{ ...todo()[0], task: e.target.value }])
                }}
                value={todo()[0].task}
              />
            </li>
            <li>
              <label>Completed : </label>
              <input
                type='checkbox'
                name='status'
                id='status'
                checked={todo()[0].completed}
                onchange={(e) => {
                  setTodo([{ ...todo()[0], completed: !todo()[0].completed }])
                }}
              />
            </li>
            <li>
              <button>Save</button>
            </li>
            <li>
              <A href='/'>Go Back</A>
            </li>
          </ul>
        </form>
      </Show>
    </div>
  )
}

export default EditTodo
