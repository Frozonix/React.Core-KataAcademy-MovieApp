import { debounce } from 'lodash'
// debounce(() => {}, 1000)
export class MovieDB {
  key = '40ff753cb28f5f4e4fa6803c99821dd9'

  getResource = async (url: string) => {
    const responce = await fetch(url)
    if (!responce.ok) {
      throw new Error(`Could not fetch ${url}; status: ${responce.status}`)
    }
    return responce.json()
  }

  getGenres = async () => {
    const responce = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`)
    return responce.json()
  }
  //   getMovie = async (id: number) => {
  //     const movie = await this.getResource()
  //     //  console.log(movie.results[0])
  //     return movie.results[id]
  //   }

  sendQuery = async (str: string, page: number) => {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${this.key}&language=en-US&query=${str}&page=${page}&include_adult=false`
    const responce = await this.getResource(URL)
    console.log(responce.results)
    return responce.results
  }

  //   MovieToObject(planet) {
  //     return {
  //       id: this._extractId(planet),
  //       name: planet.name,
  //       population: planet.population,
  //       rotationPeriod: planet.rotation_period,
  //       diameter: planet.diameter,
  //     }
  //   }
}
