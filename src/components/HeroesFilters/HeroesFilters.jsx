import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import Spinner from '../Spinner/Spinner'

import useHttp from '../../hooks/http.hook'
import {
  changeFilter,
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
} from '../../actions'

const HeroesFilters = () => {
  const { filters, activeFilter, filtersLoadingStatus } = useSelector(
    (state) => state
  )
  const dispatch = useDispatch()

  const { request } = useHttp()
  const requestUrl = 'http://localhost:3001/filters'

  useEffect(() => {
    dispatch(filtersFetching())

    request(requestUrl)
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()))
  }, [])

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />
  }
  if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return 'Фильтры не найдены'
    }

    return arr.map(({ id, label, value, classNames }) => {
      return (
        <button
          key={id}
          type="button"
          className={clsx('btn', classNames, {
            active: value === activeFilter,
          })}
          onClick={() => {
            dispatch(changeFilter(value))
          }}
        >
          {id === 'f1' ? 'Все' : label}
        </button>
      )
    })
  }

  const elements = renderFilters(filters)

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  )
}

export default HeroesFilters
