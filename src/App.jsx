import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Gift, Heart, ShoppingBag, Users, User, QrCode } from 'lucide-react'

// 页面组件
import HomePage from './pages/HomePage'
import BenefitsPage from './pages/BenefitsPage'
import DatingPage from './pages/DatingPage'
import StorePage from './pages/StorePage'
import CommunityPage from './pages/CommunityPage'
import ProfilePage from './pages/ProfilePage'
import CredentialPage from './pages/CredentialPage'

// 通用组件
import TabNavigation from './components/TabNavigation'
import ModeToggle from './components/ModeToggle'

function App() {
  const [mode, setMode] = useState('standard') // 'standard' | 'simplified'
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 从localStorage读取用户设置
    const savedMode = localStorage.getItem('displayMode')
    if (savedMode) {
      setMode(savedMode)
    }

    // 模拟用户数据
    const mockUser = {
      name: '張小明',
      id: '310123456789',
      level: '党组领导',
      invitedCount: 7,
      nextLevel: '党委书记',
      needMore: 3,
      benefits: {
        travel: 1500,
        gamePoints: 500,
        eggs: 3
      }
    }
    setUser(mockUser)
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
            <Route path="/" element={<HomePage user={user} mode={mode} />} />
            <Route path="/benefits" element={<BenefitsPage user={user} mode={mode} />} />
            <Route path="/dating" element={<DatingPage user={user} mode={mode} />} />
            <Route path="/store" element={<StorePage user={user} mode={mode} />} />
            <Route path="/community" element={<CommunityPage user={user} mode={mode} />} />
            <Route path="/profile" element={<ProfilePage user={user} mode={mode} onToggleMode={toggleMode} />} />
            <Route path="/credential" element={<CredentialPage user={user} mode={mode} />} />
          </Routes>
        </main>

        {/* 底部导航 */}
        <TabNavigation tabs={tabs} />

        {/* 模式切换组件（仅在特定页面显示） */}
        <ModeToggle mode={mode} onToggle={toggleMode} />
      </div>
    </div>
  )
}

export default App