import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CredentialCard from '../components/CredentialCard'
import BenefitsCard from '../components/BenefitsCard'
import DiscoveryCard from '../components/DiscoveryCard'
import StoreCard from '../components/StoreCard'
import CredentialPage from './CredentialPage'

const HomePage = ({ user, mode }) => {
  const [showCredentialFullscreen, setShowCredentialFullscreen] = useState(false)
  const navigate = useNavigate()

  const handleViewCredential = () => {
    setShowCredentialFullscreen(true)
  }

  const handleCloseCredential = () => {
    setShowCredentialFullscreen(false)
  }

  if (showCredentialFullscreen) {
    return <CredentialPage user={user} mode={mode} onClose={handleCloseCredential} />
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* 页面头部 */}
      <header className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">張</span>
              </div>
              <div>
                <h1 className="font-bold text-neutral-900">{user?.name || '用戶'}</h1>
                <p className="text-sm text-neutral-500">
                  等級：{user?.level || '新用戶'} ▼
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="text-primary-500 hover:text-primary-700 transition-colors"
            >
              設置
            </button>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="p-6 space-y-6">
        {/* 投诚卡片 */}
        <CredentialCard 
          user={user} 
          onViewFullscreen={handleViewCredential}
        />

        {/* 福利卡片 */}
        <BenefitsCard user={user} mode={mode} />

        {/* 发现卡片 */}
        <DiscoveryCard user={user} mode={mode} />

        {/* 商城卡片 */}
        <StoreCard mode={mode} />
      </main>
    </div>
  )
}

export default HomePage