import { useEffect } from 'react'
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

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const { heroes, heroesLoadingStatus } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { request } = useHttp()
  const requestUrl = 'http://localhost:3001/heroes'

  useEffect(() => {
    dispatch(heroesFetching())
    request(requestUrl)
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()))
  }, [])

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />
  }
  if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const onDeleteHero = (id) => {
    dispatch(deleteHero(id))

    // request(`${requestUrl}/${id}`, 'DELETE')
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

  const elements = renderHeroesList(heroes)
  return <ul>{elements}</ul>
}

export default HeroesList
