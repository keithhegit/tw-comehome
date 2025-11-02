import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Gift, Heart, ShoppingBag, Users, User, QrCode } from 'lucide-react'

// 页面组件
import HomePage from './pages/HomePage'
import BenefitsPage from './pages/BenefitsPage'
import DatingPage from './pages/DatingPage'
import StorePage from './pages/StorePage'
import CommunityPage from './pages/CommunityPage'
import ProfilePage from './pages/ProfilePage'
import CredentialPage from './pages/CredentialPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// 通用组件
import TabNavigation from './components/TabNavigation'
import ModeToggle from './components/ModeToggle'
import ProtectedRoute from './components/ProtectedRoute'

// 工具
import { getCurrentUser } from './utils/userService'

function App() {
  const [mode, setMode] = useState('standard') // 'standard' | 'simplified'
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 从localStorage读取用户设置
    const savedMode = localStorage.getItem('displayMode')
    if (savedMode) {
      setMode(savedMode)
    }

    // 从 userService 获取当前登录用户
    const loadUser = () => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
    }

    loadUser()

    // 监听 localStorage 变化（用于跨标签页同步）
    const handleStorageChange = (e) => {
      if (e.key === 'current_user' || e.key === null) {
        loadUser()
      }
    }

    // 监听用户登录/登出事件（用于同标签页同步）
    const handleUserLogin = () => {
      loadUser()
    }

    const handleUserLogout = () => {
      setUser(null)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('user-login', handleUserLogin)
    window.addEventListener('user-logout', handleUserLogout)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('user-login', handleUserLogin)
      window.removeEventListener('user-logout', handleUserLogout)
    }
  }, [])

  const toggleMode = (newMode) => {
    setMode(newMode)
    localStorage.setItem('displayMode', newMode)
  }

  // 简化模式的导航配置
  const simplifiedTabs = [
    { path: '/', icon: Home, label: '首頁' },
    { path: '/credential', icon: QrCode, label: '投誠憑證' },
    { path: '/benefits', icon: Gift, label: '福利' },
    { path: '/profile', icon: User, label: '我的' }
  ]

  // 标准模式的导航配置
  const standardTabs = [
    { path: '/', icon: Home, label: '首頁' },
    { path: '/benefits', icon: Gift, label: '福利' },
    { path: '/dating', icon: Heart, label: '交友' },
    { path: '/store', icon: ShoppingBag, label: '商城' },
    { path: '/community', icon: Users, label: '社區' }
  ]

  const tabs = mode === 'simplified' ? simplifiedTabs : standardTabs

  return (
    <div className={`min-h-screen bg-neutral-50 ${mode === 'simplified' ? 'simplified-mode' : ''}`}>
      <div className="max-w-md mx-auto bg-neutral-50 min-h-screen relative">
        {/* 主要内容区域 */}
        <main className={`pb-18 ${mode === 'simplified' ? 'pb-20' : ''}`}>
          <Routes>
            {/* 公开路由（不需要登录） */}
            <Route path="/login" element={<LoginPage mode={mode} />} />
            <Route path="/register" element={<RegisterPage mode={mode} />} />
            
            {/* 保护路由（需要登录） */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <HomePage user={user} mode={mode} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/benefits" 
              element={
                <ProtectedRoute>
                  <BenefitsPage user={user} mode={mode} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dating" 
              element={
                <ProtectedRoute>
                  <DatingPage user={user} mode={mode} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/store" 
              element={
                <ProtectedRoute>
                  <StorePage user={user} mode={mode} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/community" 
              element={
                <ProtectedRoute>
                  <CommunityPage user={user} mode={mode} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage user={user} mode={mode} onToggleMode={toggleMode} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/credential" 
              element={
                <ProtectedRoute>
                  <CredentialPage user={user} mode={mode} />
                </ProtectedRoute>
              } 
            />
            
            {/* 默认重定向：未登录重定向到登录页，已登录重定向到首页 */}
            <Route 
              path="*" 
              element={
                user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </main>

        {/* 底部导航（仅在已登录时显示） */}
        {user && <TabNavigation tabs={tabs} />}

        {/* 模式切换组件（仅在特定页面显示） */}
        {user && <ModeToggle mode={mode} onToggle={toggleMode} />}
      </div>
    </div>
  )
}

export default App