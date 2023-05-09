import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { Row, Col, Spin, Alert, Tabs } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { debounce } from 'lodash'

import { SearchInput } from '../search-input/search-input'
import { MovieCard } from '../movie-card/movie-card'
import { Pages } from '../pages/pages'
import { Context } from '../context/context'
import { MovieDB } from '../../services/movie-db/movie-db'
import './app.css'

export function App() {
  const [moviesData, setMoviesData] = useState<string[][]>([])
  const [moviesGenres, setMoviesGenres] = useState<objGenres>({})
  const [inputValue, setInputValue] = useState<string>('')
  const [isFound, setIsFound] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)

  interface I_loading {
    loading: boolean
    error: boolean
    errorMessage?: string
  }

  interface I_movieItem {
    title: 'string'
    release_date: 'string'
    overview: 'string'
    poster_path: 'string'
    vote_average: number
    genre_ids: number[]
  }

  interface I_movieGenre {
    id: number
    name: 'string'
  }

  type objGenres = {
    [key: number]: string
  }

  const [uploadState, setUploadState] = useState<I_loading>({ loading: true, error: false })
  const antIcon = (
    <LoadingOutlined
      style={{
        color: 'yellow',
        fontSize: 100,
      }}
      spin
    />
  )

  useEffect(() => {
    const api = new MovieDB()
    api.getGenres().then((result) => {
      const obj: objGenres = {}
      result.genres.map((item: I_movieGenre) => {
        obj[item.id] = item.name
        return item
      })
      setMoviesGenres(obj)
    })
  }, [])

  useEffect(() => {
    const api = new MovieDB()
    const uploadData = () => {
      setUploadState({ loading: true, error: false })
      api
        .sendQuery(inputValue, currentPage)
        .then((result) => {
          const array = result.map((item: I_movieItem, index: number): (string | number | number[])[] => {
            let title
            let releaseDate
            let overview
            let path
            let voteRating
            let genres: number[]
            ;({
              title,
              release_date: releaseDate,
              overview,
              poster_path: path,
              vote_average: voteRating,
              genre_ids: genres,
            } = item)
            return [title, releaseDate, overview, path, voteRating, genres]
          })

          setMoviesData(array)
          setUploadState({ loading: false, error: false })

          array.length === 0 ? setIsFound(false) : setIsFound(true)
          inputValue === '' && setIsFound(true)
        })
        .catch((e: Error) => {
          console.log(e)
          setUploadState({ loading: false, error: true, errorMessage: e.toString() })
        })
    }
    uploadData()
  }, [inputValue, currentPage])

  function createMovieCard() {
    const generateKey = () => Math.random().toString(36).substring(2)
    if (uploadState.loading === true) {
      return null
    }
    return moviesData.map((film) => {
      let title
      let date
      let description
      let path
      let voteRating
      let genres
      ;[title, date, description, path, voteRating, genres] = film
      return (
        <Col key={generateKey()} sm={24} xs={24} md={24} lg={12}>
          <MovieCard
            title={title}
            date={date}
            description={description}
            path={path}
            vote={voteRating}
            genres={genres}
          />
        </Col>
      )
    })
  }

  function showLoading() {
    if (uploadState.loading) {
      return <Spin indicator={antIcon} style={{ display: 'block', margin: '40px auto 0 auto' }} />
    }
    return null
  }
  function showError() {
    if (uploadState.error) {
      return <Alert type="error" message={uploadState.errorMessage} banner />
    }
    return null
  }

  function renderTabContent(id: string) {
    if (id === '1') {
      return (
        <Context.Provider value={moviesGenres}>
          <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
          <section className="movies-content">
            {!isFound ? <Alert type="info" message="По вашему запросу ничего не найдено!" banner /> : null}
            {showLoading()}
            {showError()}
            {/* <Spin indicator={antIcon} /> */}
            <Row gutter={[36, 32]} justify="space-between">
              {createMovieCard()}
            </Row>
            <Pages
              setCurrentPage={setCurrentPage}
              moviesDataLength={moviesData.length}
              uploadStateLoading={uploadState.loading}
            />
          </section>
        </Context.Provider>
      )
    }

    return (
      <Context.Provider value={moviesGenres}>
        <Row gutter={[36, 32]} justify="space-between">
          {createMovieCard()}
        </Row>
      </Context.Provider>
    )
  }
  //   const movie
  return (
    <div className="App">
      <Tabs
        defaultActiveKey="1"
        centered
        items={new Array(2).fill(null).map((_, i) => {
          const id = String(i + 1)
          return {
            label: id === '1' ? 'Search' : 'Rated',
            key: id,
            children: renderTabContent(id),
          }
        })}
      />
    </div>
  )
}
