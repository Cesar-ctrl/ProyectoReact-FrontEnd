import axios from 'axios'

const baseUrl = 'https://damp-temple-29994.herokuapp.com/api/login'

const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { login }