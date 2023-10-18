import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = newToken
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: 'Bearer ' + token }
  }
  try {
    const response = await axios.post(baseUrl, blog, config)
    return response.data
  } catch (exception) {
    console.error(exception)
  }
}

const update = async (blog) => {
  blog.user = blog.user.id
  try {
    const response = await axios.put(`/api/blogs/${blog.id}`, blog)
    return response.data

  } catch (exception) {
    console.log(exception)
  }
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: 'Bearer ' + token }
  }
  try {
    const response = await axios.delete(`/api/blogs/${id}`, config)
    return response

  } catch (exception) {
    console.log(exception)
  }
}

export default { setToken, getAll, create, update, remove }