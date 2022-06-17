import axios from 'axios'

const baseUrl = 'https://damp-temple-29994.herokuapp.com/api/users'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const users = async credentials => {
  const { data } = await axios.get(baseUrl, credentials)
  return data
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const postfav = (id, newObject) => {
  const config = {
      headers: {
      Authorization: token
      }
  }

  const request = axios.post(`${baseUrl}/fav/${id}`, newObject, config)
  return request.then(response => response.data)
}

const updateUser = (id, newObject) => {
  const config = {
      headers: {
      Authorization: token
      }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const getUser = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
  }

const getFavUser = (id) => {
  const request = axios.get(`${baseUrl}/fav/${id}`)
  return request.then(response => response.data)
}

export default { users, getAll, postfav, getUser, setToken, getFavUser, updateUser }