import axios from 'axios'

const baseUrl = 'https://damp-temple-29994.herokuapp.com/api/babyguards'

let token = null

const guards = async credentials => {
  const { data } = await axios.get(baseUrl, credentials)
  return data
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
const create = (newObject) => {
const config = {
    headers: {
    Authorization: token
    }
}

const request = axios.post(baseUrl, newObject, config)
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

export default { guards, getAll, update }