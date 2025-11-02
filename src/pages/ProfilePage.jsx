import React from 'react'
import { ArrowLeft, User, Shield, Users, Monitor, HelpCircle, Info, LogOut, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ProfilePage = ({ user, mode, onToggleMode }) => {
  const navigate = useNavigate()

  if (!user) return null

  const menuItems = [
    {
      icon: User,
      label: '個人資料',
      action: () => alert('個人資料功能開發中...')
    },
    {
      icon: Shield,
      label: '帳戶安全',
      action: () => alert('帳戶安全功能開發中...')
    },
    {
      icon: Users,
      label: `邀請進度 (${user.invitedCount}/${user.invitedCount + user.needMore})`,
      action: () => navigate('/benefits')
    },
    {
      icon: Monitor,
      label: `顯示模式 ${mode === 'standard' ? '(標準)' : '(簡化)'}`,
      action: () => onToggleMode(mode === 'standard' ? 'simplified' : 'standard')
    },
    {
      icon: HelpCircle,
      label: '幫助中心',
      action: () => alert('幫助中心功能開發中...')
    },
    {
      icon: Info,
      label: '關於我們',
      action: () => alert('關於我們功能開發中...')
    }
  ]

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
          <h1 className="text-xl font-bold text-neutral-900">
            {mode === 'simplified' ? '我的' : '我的帳戶'}
          </h1>
        </div>
      </header>

      <main className="p-6">
        {/* 用户信息卡片 */}
        <div className="card mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className={`font-bold text-neutral-900 ${mode === 'simplified' ? 'text-2xl' : 'text-xl'}`}>
                {user.name}
              </h2>
              <p className={`text-neutral-600 ${mode === 'simplified' ? 'text-lg' : 'text-base'}`}>
                等級：{user.level}
              </p>
            </div>
          </div>
        </div>

        {/* 功能列表 */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`w-full ${mode === 'simplified' ? 'card-simplified' : 'card'} flex items-center justify-between hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={24} className="text-primary-500" />
                <span className={`font-medium text-neutral-900 ${mode === 'simplified' ? 'text-lg' : 'text-base'}`}>
                  {item.label}
                </span>
              </div>
              <ChevronRight size={20} className="text-neutral-400" />
            </button>
          ))}
        </div>

        {/* 模式切换提示 */}
        {mode === 'simplified' && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-800 text-center">
              💡 點擊右上角設置按鈕可切換至標準模式
            </p>
          </div>
        )}

        {/* 退出登录 */}
        <div className="mt-8">
          <button
            onClick={() => {
              if (confirm('確定要退出登錄嗎？')) {
                alert('退出成功！')
                // 这里可以添加实际的退出逻辑
              }
            }}
            className={`w-full ${mode === 'simplified' ? 'h-16 text-lg' : 'h-14'} bg-error text-white font-bold rounded-xl hover:bg-red-600 transition-colors duration-200`}
          >
            <LogOut size={20} className="inline mr-2" />
            退出登錄
          </button>
        </div>

        {/* 版本信息 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500">
            有出息 v1.0.0
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            從從容容，游刃有余
          </p>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage