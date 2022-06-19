import axios from 'axios'

const baseUrl = 'https://damp-temple-29994.herokuapp.com/api/babyguards'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

//Este sirve para registrar un nuevo cuidador
const register = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}
//Este sirve para hacer log in de cuidador
const login = async credentials => {
  const { data } = await axios.post('https://damp-temple-29994.herokuapp.com/api/loginguards', credentials)
  return data
}
//Este sirve para traer todos los cuidadores
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
//Este sirve para traer la informacion de un solo cuidador (ver el perfil)
const getGuard = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  request.then(response => response.data)
  return request.then(response => response.data)
}

//Este sirve para cambiar la descripción del cuidador
const putdesc = (id, desc) => {
  const config = {
    headers: {
    Authorization: token
    }
  } 
  const descripcion = {
    descripcion:desc
  }
  const request = axios.put(`${baseUrl}/desc/${id}`, descripcion, config)
  return request.then(response => response.data)
}

//Este sirve para cambiar la descripción del cuidador
const puthorario = (id, horarioinicio, horariofin) => {
  const config = {
    headers: {
    Authorization: token
    }
  } 
  const horarios = {
    horarioinicio:horarioinicio,
    horariofin:horariofin
  }
  const request = axios.put(`${baseUrl}/horario/${id}`, horarios, config)
  return request.then(response => response.data)
}

//Este sirve para cambiar el cuidador
const update = (id, newObject) => {
  const config = {
      headers: {
      Authorization: token
      }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

//Este sirve para cambiar la disponibilidad del cuidador
const updateDisp = (id, newObject) => {
  const config = {
      headers: {
      Authorization: token
      }
  }
  var dispon = {
    disponible:newObject
  }
  const request = axios.put(`${baseUrl}/disp/${id}`, dispon, config)
  return request.then(response => response.data)
}


const getChatGuard = (id) => {
  const request = axios.get(`${baseUrl}/chat/${id}`)
  return request.then(response => response.data)
}


export default { login, register, putdesc, getAll, update, updateDisp, setToken, getGuard, puthorario, getChatGuard }