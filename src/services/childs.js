import axios from 'axios'

const baseUrl = 'https://damp-temple-29994.herokuapp.com/api/hijos'

const child = async credentials => {
  console.log(credentials)
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { child, getAll }