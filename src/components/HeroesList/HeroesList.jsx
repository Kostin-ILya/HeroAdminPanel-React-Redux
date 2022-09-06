import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useHttp from '../../hooks/http.hook'

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  deleteHero,
} from '../../actions'
import HeroesListItem from '../HeroesListItem/HeroesListItem'
import Spinner from '../Spinner/Spinner'

const HeroesList = () => {
  const { heroes, heroesLoadingStatus, activeFilter } = useSelector(
    (state) => state
  )
  const dispatch = useDispatch()
  const { request } = useHttp()
  const requestUrl = 'http://localhost:3001/heroes'

  useEffect(() => {
    dispatch(heroesFetching())
    request(requestUrl)
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()))
  }, [])

  const onDeleteHero = useCallback((id) => {
    request(`${requestUrl}/${id}`, 'DELETE')
      .then(() => {
        dispatch(deleteHero(id))
      })
      .catch((e) => {
        console.error(e)
      })
  })

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />
  }
  if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>
    }

    return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem
          key={id}
          {...props}
          onDeleteHero={() => {
            onDeleteHero(id)
          }}
        />
      )
    })
  }

  const filterItems = (heroesArr, filter) => {
    switch (filter) {
      case 'fire':
        return heroesArr.filter((item) => item.element === 'fire')
      case 'wind':
        return heroesArr.filter((item) => item.element === 'wind')
      case 'water':
        return heroesArr.filter((item) => item.element === 'water')
      case 'earth':
        return heroesArr.filter((item) => item.element === 'earth')
      default:
        return heroesArr
    }
  }

  const visibleElements = renderHeroesList(filterItems(heroes, activeFilter))

  return <ul>{visibleElements}</ul>
}

export default HeroesList
