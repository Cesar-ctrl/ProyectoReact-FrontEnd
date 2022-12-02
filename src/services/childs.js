import axios from 'axios'

const baseUrl = 'https://babyguard.onrender.com/api/hijos'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const child = async credentials => {
  const config = {
    headers: {
    Authorization: token
    }
}
  const { data } = await axios.post(baseUrl, credentials, config)
  return data
}

const getAll = () => {
  const config = {
    headers: {
    Authorization: token
    }
}

    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const getChild = (id) => {
  const config = {
    headers: {
    Authorization: token
    }
}
    const request =  axios.get(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}
const update = (id, newObject) => {
  const config = {
      headers: {
      Authorization: token
      }
  }
  
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
  }


export default { child, getAll, setToken, getChild, update }