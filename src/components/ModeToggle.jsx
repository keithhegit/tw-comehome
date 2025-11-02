import React from 'react'
import { Settings } from 'lucide-react'

const ModeToggle = ({ mode, onToggle }) => {
  // 只在个人资料页面显示模式切换
  if (window.location.pathname !== '/profile') {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-40">
      <button
        onClick={() => onToggle(mode === 'standard' ? 'simplified' : 'standard')}
        className="bg-white rounded-full p-3 shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-200"
        title={mode === 'standard' ? '切換至簡化模式' : '切換至標準模式'}
      >
        <Settings size={20} className="text-neutral-600" />
      </button>
    </div>
  )
}

export default ModeToggle