import React from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../utils/userService'

const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser()
  
  if (!user) {
    // 未登录，重定向到登录页
    return <Navigate to="/login" replace />
  }
  
  // 已登录，渲染子组件
  return children
}

export default ProtectedRoute

