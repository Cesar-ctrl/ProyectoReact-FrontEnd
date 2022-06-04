import axios from 'axios'

const baseUrl = 'https://damp-temple-29994.herokuapp.com/api/users'

let token = null

const users = async credentials => {
  const { data } = await axios.get(baseUrl, credentials)
  return data
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
const config = {
    headers: {
    Authorization: token
    }
}

const request = axios.put(`${baseUrl}/fav/${id}`, newObject, config)
return request.then(response => response.data)
}

export default { guards, getAll, update, getFav }