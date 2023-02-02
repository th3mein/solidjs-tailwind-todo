import { createSignal, createEffect } from 'solid-js'
import State from './store'

const FilterByTabs = () => {
  const [state, setState] = State
  const [filterBy, setFilterBy] = createSignal(state.filterBy)

  createEffect(() => {
    setState('filterBy', filterBy())
  })
  // Filters
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

export default FilterByTabs
