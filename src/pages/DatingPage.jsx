import React, { useState } from 'react'
import { ArrowLeft, Heart, MessageCircle, X, ThumbsUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DatingPage = ({ user, mode }) => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hearts, setHearts] = useState(3) // 模拟爱心值
  const maxHearts = 5

  // 模拟用户数据
  const matches = [
    {
      id: 1,
      name: '小雨',
      age: 24,
      location: '北京',
      photo: '👩',
      bio: '喜歡看電影和旅行，希望找到真誠的朋友',
      interests: ['電影', '旅行', '美食']
    },
    {
      id: 2,
      name: '建國',
      age: 26,
      location: '上海',
      photo: '👨',
      bio: '工程師，喜歡戶外運動和攝影',
      interests: ['攝影', '運動', '科技']
    },
    {
      id: 3,
      name: '美麗',
      age: 23,
      location: '廣州',
      photo: '👩',
      bio: '設計師，愛好藝術和音樂',
      interests: ['設計', '音樂', '藝術']
    }
  ]

  const currentMatch = matches[currentIndex]

  const handleLike = () => {
    if (hearts < maxHearts) {
      setHearts(hearts + 1)
    }
    
    // 移动到下一个用户
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // 重新开始
    }
  }

  const handlePass = () => {
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const handleChat = () => {
    alert('聊天功能開發中...')
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
          <h1 className="text-xl font-bold text-neutral-900">每日匹配 (3)</h1>
        </div>
      </header>

      <main className="p-6">
        {/* 抽奖提示 */}
        <div className="card bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200 mb-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-neutral-900 mb-3">
              集滿 5 個愛心抽獎：三亞蜜月遊
            </h2>
            <div className="flex justify-center gap-2 mb-3">
              {Array.from({ length: maxHearts }, (_, i) => (
                <Heart
                  key={i}
                  size={24}
                  className={i < hearts ? 'text-red-500 fill-current' : 'text-neutral-300'}
                />
              ))}
            </div>
            <p className="text-neutral-600">
              您有 <span className="font-bold text-red-500">{hearts}</span> / {maxHearts} 顆愛心
            </p>
          </div>
        </div>

        {/* 用户卡片 */}
        {currentMatch && (
          <div className="card max-w-sm mx-auto">
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{currentMatch.photo}</div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                {currentMatch.name}, {currentMatch.age}
              </h3>
              <p className="text-neutral-600 mb-4">{currentMatch.location}</p>
              
              <p className="text-neutral-700 mb-4">{currentMatch.bio}</p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {currentMatch.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handlePass}
                className="w-16 h-16 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:bg-neutral-50 transition-colors"
              >
                <X size={24} className="text-neutral-600" />
              </button>
              
              <button
                onClick={handleLike}
                className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <ThumbsUp size={24} className="text-white" />
              </button>
              
              <button
                onClick={handleChat}
                className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <MessageCircle size={24} className="text-white" />
              </button>
            </div>
          </div>
        )}

        {/* 提示文字 */}
        <div className="text-center mt-8">
          <p className="text-neutral-500">
            {currentIndex < matches.length - 1 
              ? `還有 ${matches.length - currentIndex - 1} 個推薦` 
              : '今日推薦已完成，明天再來吧！'
            }
          </p>
        </div>
      </main>
    </div>
  )
}

export default DatingPage