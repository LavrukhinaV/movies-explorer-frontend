class MainApi {
  constructor({ baseUrl, headers }) {
    this._headers = headers
    this._baseUrl = baseUrl
  }

  _checkReponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkReponse)
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkReponse)
  }

  editProfile(newInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json',
        'Origin': 'https://moviesexplorer.lavrukhina.nomoredomains.sbs'
      },
      body: JSON.stringify(newInfo)
    })
    .then(this._checkReponse)
  }

  saveMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json',
        'Origin': 'https://moviesexplorer.lavrukhina.nomoredomains.sbs'
      },
      body: JSON.stringify(data)
    })
    .then(this._checkReponse)
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json',
        'Origin': 'https://moviesexplorer.lavrukhina.nomoredomains.sbs'
      },
    })
    .then(this._checkReponse)
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.moviesexplorer.lavrukhina.nomoredomains.sbs',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    'Content-Type': 'application/json',
    'Origin': 'https://moviesexplorer.lavrukhina.nomoredomains.sbs'
  }
}); 

export default mainApi;