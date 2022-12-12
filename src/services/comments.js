import axios from 'axios'

const baseUrl = 'https://babyguard.onrender.com/api/comments'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const sendCommentRoute = async credentials => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const { data } = await axios.post(`${baseUrl}/addcomment`, credentials, config)
    return data
}

const recieveCommentRoute  = async credentials => {

    const recive = {
        to:credentials
    }
    const { data } = await axios.post(`${baseUrl}/getcomment`, recive)

    return data
}

const recieveValRoute  = async credentials => {

    const recive = {
        to:credentials
    }
    const { data } = await axios.post(`${baseUrl}/getval`, recive)
    return data
}


const recieveAllVal = async credentials => {

    const recive = {
        to:credentials
    }
    const { data } = await axios.post(`${baseUrl}/getvalcomments`, recive)
    return data
}


export default { sendCommentRoute, recieveCommentRoute, recieveValRoute, recieveAllVal, setToken }