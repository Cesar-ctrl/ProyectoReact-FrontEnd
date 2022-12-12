import axios from 'axios'

const baseUrl = 'https://babyguard.onrender.com/api/users'

const register = async credentials => {
  console.log(credentials)
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { register }