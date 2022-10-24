import axios from 'axios'

const baseUrl = 'https://damp-temple-29994.herokuapp.com/api/solicitudes'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
  }

const sendSolicitudRoute = async credentials => {
const config = {
        headers: {
            Authorization: token
        }
    }
    const { data } = await axios.post(`${baseUrl}/`, credentials, config)
    return data
}

const getSolicitudes = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
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

export default { setToken, sendSolicitudRoute, getSolicitudes, putSolicitudes }