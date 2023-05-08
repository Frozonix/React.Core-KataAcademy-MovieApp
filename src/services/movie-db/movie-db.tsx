export class MovieDB {
  key = '40ff753cb28f5f4e4fa6803c99821dd9'

  #apiBase = `https://api.themoviedb.org/3/search/movie?api_key=${this.key}&language=en-US&query=return&page=1&include_adult=false`

  getResource = async () => {
    const responce = await fetch(this.#apiBase)
    if (!responce.ok) {
      throw new Error(`Could not fetch ${this.#apiBase}; status: ${responce.status}`)
    }
    return responce.json()
  }

  getMovie = async (id: number) => {
    const movie = await this.getResource()
    //  console.log(movie.results[0])
    return movie.results[id]
  }

  //   sendQuery = (str: string) => {
  //     const URL = `https://api.themoviedb.org/3/search/movie?api_key=${this.key}&language=en-US&query=${str}&page=1&include_adult=false`
  //     const movie = this.getResource()
  //     //  console.log(movie.results[0])
  //     return movie.results[id]
  //   }

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
