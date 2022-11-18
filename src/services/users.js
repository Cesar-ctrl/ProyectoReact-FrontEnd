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
  const info ={
    guards:newObject
  }
  const request = axios.post(`${baseUrl}/fav/${id}`, info, config)
  return request.then(response => response.data)
}

const putfav = (id, newObject) => {
  const config = {
      headers: {
      Authorization: token
      }
  }
  const info ={
    guards:newObject
  }
  const request = axios.put(`${baseUrl}/fav/${id}`, info, config)
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

const getchildsUser = (id) => {
  const request = axios.get(`${baseUrl}/hijos/${id}`)
  return request.then(response => response.data)
}

const getFavUser = (id) => {
  const request = axios.get(`${baseUrl}/fav/${id}`)
  return request.then(response => response.data)
}

const getChatUser = (id) => {
  const request = axios.get(`${baseUrl}/chat/${id}`)
  return request.then(response => response.data)
}

const postChat = (id, newObject) => {
  const config = {
      headers: {
      Authorization: token
      }
  }
  const info ={
    chats:newObject
  }
  console.log(info)
  const request = axios.post(`${baseUrl}/chat/${id}`, info, config)
  return request.then(response => response.data)
}

export default { users, getAll, postfav, putfav, getUser, getchildsUser, setToken, getFavUser, updateUser, getChatUser, postChat }