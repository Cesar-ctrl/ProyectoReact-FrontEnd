import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/solicitudes/'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
  }

const postSolicitud = async (body) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const { data } = await axios.post(`${baseUrl}/send`, body, config)
    return data
}

const yaSolicitado = async (body) => {
  const config = {
      headers: {
          Authorization: token
      }
  }
  const { data } = await axios.post(`${baseUrl}/solicitado`, body, config)
  return data
}

const getSolicitudes = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    request.then(response => response.data)
    return request.then(response => response.data)
}

const getHistorySolicitudes = (id) => {
  const request = axios.get(`${baseUrl}/history/${id}`)
  request.then(response => response.data)
  return request.then(response => response.data)
}

//Este sirve para cambiar la descripción del cuidador
const putSolicitudes = (id, aprob) => {
    const config = {
      headers: {
      Authorization: token
      }
    } 
    const descripcion = {
      aprobado:aprob
    }
    const request = axios.put(`${baseUrl}/${id}`, descripcion, config)
    return request.then(response => response.data)
}

const deleteSolicitudes = (id) => {
  const config = {
    headers: {
    Authorization: token
    }
  } 
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}


export default { setToken, postSolicitud, yaSolicitado, getSolicitudes, getHistorySolicitudes, putSolicitudes, deleteSolicitudes }