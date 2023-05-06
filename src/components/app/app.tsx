import React, { ReactElement, useEffect, useState } from 'react'
import { Row, Col } from 'antd'

import { MovieCard } from '../movie-card/movie-card'
import { MovieDB } from '../../services/movie-db/movie-db'
import './app.css'

export function App() {
  const [moviesData, setMoviesData] = useState<string[][]>([])

  interface I_movieItem {
    title: 'string'
    release_date: 'string'
    overview: 'string'
    poster_path: 'string'
  }

  useEffect(() => {
    const api = new MovieDB()
    const uploadData = () => {
      api.getResource().then((result) => {
        const array = result.results.map((item: I_movieItem, index: number): string[] => {
          console.log(item)
          let title
          let releaseDate
          let overview
          let path
          ;({ title, release_date: releaseDate, overview, poster_path: path } = item)
          return [title, releaseDate, overview, path]
        })
        setMoviesData(array)
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

  //   const movie
  return (
    <div className="App">
      <section className="movies-content">
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
