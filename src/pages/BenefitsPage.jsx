import React from 'react'
import { ArrowLeft, Gift, Lock, UserPlus, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BenefitsPage = ({ user, mode }) => {
  const navigate = useNavigate()

  if (!user) return null

  const benefits = [
    {
      type: 'travel',
      label: '旅遊代金券',
      value: `¥${user.benefits.travel}`,
      icon: '🏖️',
      description: '可用於大陸旅遊消費'
    },
    {
      type: 'game',
      label: '遊戲點券',
      value: `${user.benefits.gamePoints} 點`,
      icon: '🎮',
      description: '適用於主流手機遊戲'
    },
    {
      type: 'eggs',
      label: '雞蛋兌換券',
      value: `${user.benefits.eggs} 張`,
      icon: '🥚',
      description: '可兌換新鮮雞蛋'
    }
  ]

  const handleInvite = () => {
    const inviteLink = `${window.location.origin}?ref=${user.id}`
    
    if (navigator.share) {
      navigator.share({
        title: '加入有出息',
        text: '一起獲得豐厚福利！',
        url: inviteLink
      })
    } else {
      navigator.clipboard.writeText(inviteLink).then(() => {
        alert('邀請鏈接已複製到剪貼板！')
      })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* 页面头部 */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center gap-4 px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-neutral-600" />
          </button>
          <h1 className="text-xl font-bold text-neutral-900">福利中心</h1>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* 专属福利 */}
        <div className={mode === 'simplified' ? 'card-simplified' : 'card'}>
          <div className="flex items-center gap-2 mb-6">
            <Gift size={24} className="text-primary-500" />
            <h2 className="text-2xl font-bold text-neutral-900">您的專屬福利（已鎖定）</h2>
          </div>
          
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{benefit.icon}</span>
                  <div>
                    <h3 className={`font-semibold text-neutral-900 ${mode === 'simplified' ? 'text-lg' : 'text-base'}`}>
                      {benefit.label}
                    </h3>
                    <p className="text-sm text-neutral-500">{benefit.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-primary-500 ${mode === 'simplified' ? 'text-lg' : 'text-base'}`}>
                    {benefit.value}
                  </p>
                  <Lock size={16} className="text-neutral-400 ml-auto" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <div className="flex items-center gap-2 text-neutral-500">
              <Lock size={16} />
              <p className={mode === 'simplified' ? 'text-lg' : 'text-sm'}>
                *解鎖條件：哪天統一哪天發放
              </p>
            </div>
          </div>
        </div>

        {/* 邀请好友 */}
        <div className={mode === 'simplified' ? 'card-simplified' : 'card'}>
          <div className="flex items-center gap-2 mb-6">
            <UserPlus size={24} className="text-primary-500" />
            <h2 className="text-2xl font-bold text-neutral-900">邀請好友 加速升級</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={mode === 'simplified' ? 'text-lg font-semibold' : 'text-base'}>
                距[{user.nextLevel}]還差 {user.needMore} 人
              </span>
              <button
                onClick={handleInvite}
                className="text-primary-500 font-medium hover:text-primary-700 transition-colors"
              >
                邀請 →
              </button>
            </div>
            
            <div className="w-full bg-neutral-200 rounded-full h-3">
              <div 
                className="bg-primary-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(user.invitedCount / (user.invitedCount + user.needMore)) * 100}%` }}
              ></div>
            </div>
            
            <p className="text-center text-neutral-500">
              {user.invitedCount}/{user.invitedCount + user.needMore}
            </p>
          </div>
          
          <div className="mt-6 flex gap-3">
            <button className="flex-1 btn-secondary">
              <Trophy size={20} className="inline mr-2" />
              查看我的等級
            </button>
            <button className="flex-1 btn-primary">
              新人抽獎
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BenefitsPage