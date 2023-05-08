import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { Row, Col, Spin, Alert } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { SearchInput } from '../search-input/search-input'
import { MovieCard } from '../movie-card/movie-card'
import { MovieDB } from '../../services/movie-db/movie-db'
import './app.css'

export function App() {
  const [moviesData, setMoviesData] = useState<string[][]>([])

  interface I_loading {
    loading: boolean
    error: boolean
    errorMessage?: string
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

  interface I_movieItem {
    title: 'string'
    release_date: 'string'
    overview: 'string'
    poster_path: 'string'
  }

  useEffect(() => {
    const api = new MovieDB()
    const uploadData = () => {
      api
        .getResource()
        .then((result) => {
          const array = result.results.slice(0, 6).map((item: I_movieItem, index: number): string[] => {
            console.log(item)
            let title
            let releaseDate
            let overview
            let path
            ;({ title, release_date: releaseDate, overview, poster_path: path } = item)
            return [title, releaseDate, overview, path]
          })

          setMoviesData(array)
          setUploadState({ loading: false, error: false })
        })
        .catch((e: Error) => {
          console.log(e)
          setUploadState({ loading: false, error: true, errorMessage: e.toString() })
        })
    }
    uploadData()
  }, [])

  function createMovieCard() {
    const generateKey = () => Math.random().toString(36).substring(2)
    return moviesData.map((film) => {
      let title
      let date
      let description
      let path
      ;[title, date, description, path] = film
      return (
        <Col span={12} key={generateKey()}>
          <MovieCard title={title} date={date} description={description} path={path} />
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

  //   const movie
  return (
    <div className="App">
      <SearchInput />
      <section className="movies-content">
        {showLoading()}
        {showError()}
        {/* <Spin indicator={antIcon} /> */}
        <Row gutter={[36, 32]} justify="space-between">
          {createMovieCard()}
          {/* <Col span={12}>
            <MovieCard />
          </Col>
          <Col span={12}>
            <MovieCard />
          </Col>
          <Col span={12}>
            <MovieCard />
          </Col>
          <Col span={12}>
            <MovieCard />
          </Col>
          <Col span={12}>
            <MovieCard />
          </Col>
          <Col span={12}>
            <MovieCard />
          </Col> */}
        </Row>
      </section>
    </div>
  )
}
