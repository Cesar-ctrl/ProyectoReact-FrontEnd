import axios from 'axios'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const subeImg = async (id, credentials) => {
    const data = new FormData() 
    data.append('file', credentials)
    data.append('body', id)
    var response = {}
    const { data2 } = await axios({
        method: "post",
        url:'https://babyguard.onrender.com/api/img', 
        data: credentials,
        headers: {
            "Content-Type": "multipart/form-data",
            "authorization": token
        }
    })
    .then(res => { // then print response status
        console.warn(res.data.filename);
        response = res.data.filename
        return res.data.filename
    })
    console.warn(data2);
    console.warn(response);
    return response
}

export default { setToken, subeImg }