import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = newToken
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: 'Bearer ' + token}
  }
  try {
    const response = await axios.post(baseUrl, blog, config)
    return response.data
  } catch (exception) {
    console.error(exception)
  }
}

export default { getAll, create, setToken }