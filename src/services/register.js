import axios from 'axios'

const baseUrl = 'https://damp-temple-29994.herokuapp.com/api/users'

const register = async credentials => {
  console.log(credentials)
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { register }