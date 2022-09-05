export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING',
  }
}

export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes,
  }
}

export const optionsFetched = (options) => {
  return {
    type: 'OPTIONS_FETCHED',
    payload: {
      options,
    },
  }
}

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR',
  }
}

export const deleteHero = (id) => {
  return {
    type: 'DELETE_HERO',
    payload: {
      id,
    },
  }
}

export const addHero = (hero) => {
  return {
    type: 'ADD_HERO',
    payload: {
      hero,
    },
  }
}
