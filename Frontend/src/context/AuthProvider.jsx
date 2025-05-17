import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const initialUserState = localStorage.getItem('ChatApp')
    if (initialUserState) {
      setAuthUser(JSON.parse(initialUserState))
    }
  }, [])
  const logout = async () => {
    try {
      const response = await axios.post('/api/user/logout');
      if (response.data.success) {
        navigate('/');
        setAuthUser(null);
        localStorage.removeItem('ChatApp');
        localStorage.removeItem('email');

        toast.success("Logout successful");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  }

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext);

