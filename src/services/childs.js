import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/hijos'

const child = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { child, getAll }