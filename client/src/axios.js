import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://welcometoimessage.herokuapp.com'
})

export default instance;
