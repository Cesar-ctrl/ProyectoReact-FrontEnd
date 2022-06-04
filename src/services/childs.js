import axios from 'axios'

const baseUrl = 'https://damp-temple-29994.herokuapp.com/api/hijos'

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



export default { child, getAll, setToken }