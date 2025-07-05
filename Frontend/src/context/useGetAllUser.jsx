import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useGetAllUser = () => {
  const [allUsers, setAllUsers] = useState([])
  console.log(allUsers);
  const [loading, setLoading] = useState(false)
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
  
    const getUsers = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${backendUrl}/api/user/getUser`);
        setAllUsers(response.data.users)
      } catch (error) {
        console.log('Error in GetAllUsers:', error)
      } finally {
        setLoading(false)
      }
    }
    getUsers()
  }, [])

  return [allUsers, loading]
}

export default useGetAllUser

