const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      }
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle',
      }
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      }

    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading',
      }
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: action.payload.filters,
        filtersLoadingStatus: 'idle',
      }

    case 'FILTERS_FETCHING_ERROR':
      return {
        ...state,
        filtersLoadingStatus: 'error',
      }

    case 'DELETE_HERO':
      return {
        ...state,
        heroes: state.heroes.filter((item) => item.id !== action.payload.id),
      }
    case 'ADD_HERO':
      return {
        ...state,
        heroes: [...state.heroes, action.payload.hero],
      }
    case 'CHANGE_FILTER':
      return {
        ...state,
        activeFilter: action.payload.filter,
      }
    default:
      return state
  }
}

export default reducer
