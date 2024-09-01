import React, { createContext, useState, useEffect } from "react"
import { getToken, extractUserIdFromToken } from "../pages/authUtils"
import axios from "axios"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getToken()
      if (token) {
        try {
          const _id = await extractUserIdFromToken(token)
          const response = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          setUser(response.data)
        } catch (error) {
          console.error('Error fetching user data:', error)
          setUser(null)
        }
      }
    }

    fetchUserData()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}