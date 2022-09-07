import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'

import { addHero } from '../../actions'
import useHttp from '../../hooks/http.hook'

const HeroesAddForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [element, setElement] = useState('')

  const { filters: options, filtersLoadingStatus } = useSelector(
    (state) => state
  )
  const dispatch = useDispatch()

  const { request } = useHttp()
  const requestUrl = 'http://localhost:3001/'

  const onSubmitForm = (e) => {
    e.preventDefault()

    const newHero = {
      id: nanoid(),
      name,
      description,
      element,
    }

    if (name.length > 2 && description.length > 2) {
      request(`${requestUrl}heroes`, 'POST', JSON.stringify(newHero))
        .then(() => dispatch(addHero(newHero)))
        .catch((err) => console.error(err))

      setName('')
      setDescription('')
      setElement('')
    }
  }

  const renderOptions = (optionsArr) => {
    if (optionsArr.length === 0) {
      return 'Элементы не найдены'
    }

    if (filtersLoadingStatus === 'loading') {
      return <option>Загрузка элементов</option>
    }
    if (filtersLoadingStatus === 'error') {
      return <option>Ошибка загрузки</option>
    }

    return optionsArr.map(({ id, value, label }) => {
      if (id === 'f1') {
        return undefined
      }

      return (
        <option key={id} value={value}>
          {label}
        </option>
      )
    })
  }

  const optionElements = renderOptions(options)

  return (
    <form className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
          style={{ height: '130px' }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={element}
          onChange={(e) => {
            setElement(e.target.value)
          }}
        >
          <option value="" disabled>
            Я владею элементом...
          </option>
          {optionElements}
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => {
          onSubmitForm(e)
        }}
      >
        Создать
      </button>
    </form>
  )
}

export default HeroesAddForm
