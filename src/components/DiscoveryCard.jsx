import React from 'react'
import { Users, TrendingUp, ChevronRight, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DiscoveryCard = ({ user, mode }) => {
  const navigate = useNavigate()

  if (!user) return null

  const handleInvite = () => {
    // 生成邀请链接
    const inviteLink = `${window.location.origin}?ref=${user.id}`
    
    if (navigator.share) {
      navigator.share({
        title: '加入有出息',
        text: '一起獲得豐厚福利！',
        url: inviteLink
      })
    } else {
      // 复制到剪贴板
      navigator.clipboard.writeText(inviteLink).then(() => {
        alert('邀請鏈接已複製到剪貼板！')
      })
    }
  }

  return (
    <div className={mode === 'simplified' ? 'card-simplified' : 'card'}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
          <Users size={24} className="text-primary-500" />
          發現
        </h3>
        <button
          onClick={() => navigate('/community')}
          className="flex items-center gap-1 text-primary-500 font-medium hover:text-primary-700 transition-colors"
        >
          更多
          <ChevronRight size={16} />
        </button>
      </div>
      
      {/* 邀请进度 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className={mode === 'simplified' ? 'text-lg font-semibold' : 'text-base'}>
            距[{user.nextLevel}]還差 {user.needMore} 人
          </span>
          <button
            onClick={handleInvite}
            className="flex items-center gap-1 text-primary-500 font-medium hover:text-primary-700 transition-colors"
          >
            <UserPlus size={16} />
            邀請
          </button>
        </div>
        
        <div className="w-full bg-neutral-200 rounded-full h-2 mb-3">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(user.invitedCount / (user.invitedCount + user.needMore)) * 100}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-neutral-500">
          {user.invitedCount}/{user.invitedCount + user.needMore}
        </p>
      </div>
      
      {/* 动态信息 */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
          <TrendingUp size={20} className="text-success" />
          <div>
            <p className="text-sm font-medium">親，身邊又有 5 個同胞投誠了哦</p>
            <p className="text-xs text-neutral-500">2 分鐘前</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
          <Users size={20} className="text-primary-500" />
          <div>
            <p className="text-sm font-medium">[匿名] 剛剛在社區發帖...</p>
            <p className="text-xs text-neutral-500">5 分鐘前</p>
          </div>
        </div>
      </div>
      
      {mode === 'simplified' && (
        <button
          onClick={handleInvite}
          className="w-full btn-primary btn-large mt-6"
        >
          立即邀請好友
        </button>
      )}
    </div>
  )
}

export default DiscoveryCard