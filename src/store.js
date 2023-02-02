import { createStore } from 'solid-js/store'

export default createStore({
  todos: [
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
  ],
  filterBy: false,
  one: {
    abc: 'cba',
    def: 'fed',
  },
})
