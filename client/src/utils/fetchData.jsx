import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export const getDataAPI = async (url, token) => {
  try {
    const res = await apiClient.get(`/api/${url}`, {
      headers: { Authorization: token }
    })
    return res
  } catch (error) {
    console.error('Can not get data, ', error)
    throw error
  }
}

export const postDataAPI = async (url, post, token) => {
  try {
    const res = await apiClient.post(`/api/${url}`, post, {
      headers: { Authorization: token },
      credentials: 'include'
    })
    return res
  } catch (error) {
    console.error('Can not post data, ', error)
    throw error
  }
}

export const putDataAPI = async (url, post, token) => {
  try {
    const res = await apiClient.put(`/api/${url}`, post, {
      headers: { Authorization: token }
    })
    return res
  } catch (error) {
    console.error('Can not update data, ', error)
    throw error
  }
}

export const patchDataAPI = async (url, post, token) => {
  try {
    const res = await apiClient.patch(`/api/${url}`, post, {
      headers: { Authorization: token }
    })
    return res
  } catch (error) {
    console.error('Can not update data, ', error)
    throw error
  }
}

export const deleteDataAPI = async (url, token) => {
  try {
    const res = await apiClient.delete(`/api/${url}`, {
      headers: { Authorization: token }
    })
    return res
  } catch (error) {
    console.error('Can not delete data, ', error)
    throw error
  }
}
