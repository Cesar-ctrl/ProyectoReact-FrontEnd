import axios from 'axios'

const baseUrl = 'https://babyguard.onrender.com/api/messages/'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const sendMessageRoute = async credentials => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const { data } = await axios.post(`${baseUrl}/addmsg`, credentials, config)
    return data
}

const recieveMessageRoute  = async credentials => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const { data } = await axios.post(`${baseUrl}/getmsg`, credentials, config)
    return data
}

const recieveLastMessageRoute  = async credentials => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const { data } = await axios.post(`${baseUrl}/getlastmsg`, credentials, config)
    return data
}

export default { recieveMessageRoute, sendMessageRoute, recieveLastMessageRoute, setToken }