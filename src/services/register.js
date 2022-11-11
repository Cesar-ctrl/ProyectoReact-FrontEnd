import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

const register = async credentials => {
  console.log(credentials)
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { register }