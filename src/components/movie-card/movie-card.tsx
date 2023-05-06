import React from 'react'
import { Space, Tag } from 'antd'
import './movie-card.css'
import { format } from 'date-fns'
import enGB from 'date-fns/locale/en-GB'

interface I_cardProps {
  title: string
  date: string
  description: string
  path: string
}
export function MovieCard({ title, date, description, path }: I_cardProps) {
  let newDate: string
  if (date) {
    newDate = format(new Date(date), 'MMMM dd, yyyy', { locale: enGB })
  } else {
    newDate = 'No release date information'
  }
  /// /////////////////////////////////////////////////

  function descriptionSlice() {
    let shortDescription = description.slice(0, 180)
    let i = 179
    if (description.length > 180) {
      while (shortDescription[i]) {
        i--
        if (shortDescription[i] === ' ') {
          shortDescription = `${shortDescription.slice(0, i)} ...`
          break
        }
      }
    }
    return shortDescription
  }
  const setImage = () => `https://image.tmdb.org/t/p/w500/${path}`

  return (
    <div className="movie-card">
      <div className="movie-card__img-wrapper">
        <img src={setImage()} alt="Обложка отсутствует" />
      </div>
      <div className="movie-card__info-wrapper">
        <h3>{title}</h3>
        <p className="movie-card__date">{newDate}</p>
        <div className="movie-card__genres-wrapper">
          <Space size={[0, 8]} wrap>
            <Tag className="movie-card__genre-item">Action</Tag>
            <Tag className="movie-card__genre-item">Drama</Tag>
          </Space>
        </div>
        <p>{descriptionSlice()}</p>
      </div>
    </div>
  )
}
