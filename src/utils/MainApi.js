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
      headers: this._headers
    })
    .then(this._checkReponse)
  }

  editProfile(newInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(newInfo)
    })
    .then(this._checkReponse)
  }

  saveMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkReponse)
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkReponse)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`,{
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkReponse)
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._checkReponse)
  }

  changeSaveMovie(id, isSaved) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: `${isSaved ? "PUT" : "DELETE"}`,
      headers: this._headers,
    })
    .then(this._checkReponse)
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    'Content-Type': 'application/json',
    'Origin': 'http://localhost:3001'
  }
}); 

export default mainApi;