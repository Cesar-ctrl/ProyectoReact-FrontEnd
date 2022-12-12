import axios from 'axios'

const baseUrl = 'https://babyguard.onrender.com/api/solicitudes'

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

const getSolicitudes = async (id) => {
    const { data } = await axios.get(`${baseUrl}/${id}`)
    return data
}

const getHistorySolicitudes = (id) => {
  const request = axios.get(`${baseUrl}/history/${id}`)
  request.then(response => response.data)
  return request.then(response => response.data)
}

const getHistoryContratos = (id) => {
  const request = axios.get(`${baseUrl}/history/contratos/${id}`)
  request.then(response => response.data)
  return request.then(response => response.data)
}

//Este sirve para cambiar la descripción del cuidador
const putSolicitudes = (id, aprob, user, guard) => {
  const config = {
      headers: {
      Authorization: token
      }
    } 
    const descripcion = {
      aprobado:aprob,
      user:user,
      guard:guard
    }
    const request = axios.put(`${baseUrl}/${id}`, descripcion, config)
    return request.then(response => response.data)
}

const putEndSolicitud = (id, acabado, guard) => {
  const config = {
    headers: {
    Authorization: token
    }
  } 
  const cuerpo = {
    acabado:acabado,
    guard:guard
  }
  const request = axios.put(`${baseUrl}/acabar/${id}`, cuerpo, config)
    return request.then(response => response.data)
}

const deleteSolicitudes = async (id) => {
  const config = {
    headers: {
    Authorization: token
    }
  } 
  const { data } = await axios.delete(`${baseUrl}/${id}`, config)
  return data
}


export default { setToken, postSolicitud, yaSolicitado, getSolicitudes, getHistorySolicitudes, getHistoryContratos, putSolicitudes, putEndSolicitud, deleteSolicitudes }