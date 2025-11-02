import React, { useState, useMemo } from 'react'
import { ArrowLeft, Heart, MessageCircle, X, ThumbsUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DatingPage = ({ user, mode }) => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hearts, setHearts] = useState(3) // 模拟爱心值
  const maxHearts = 5

  // 生成100个匹配用户数据
  const generateMatches = () => {
    const photos = ['👩', '👨', '👧', '🧑', '👶', '🧒', '👴', '👵']
    const cities = ['北京', '上海', '廣州', '深圳', '杭州', '成都', '重慶', '武漢', '西安', '南京', '台北', '高雄', '台中', '台南', '新北', '桃園']
    const allInterests = [
      '電影', '旅行', '美食', '攝影', '運動', '科技', '設計', '音樂', '藝術', '閱讀',
      '寫作', '繪畫', '跳舞', '唱歌', '遊戲', '健身', '瑜伽', '登山', '游泳', '跑步',
      '咖啡', '茶藝', '烘焙', '烹飪', '寵物', '園藝', '收藏', '手工', '編程', '投資'
    ]
    const bios = [
      '喜歡看電影和旅行，希望找到真誠的朋友',
      '工程師，喜歡戶外運動和攝影',
      '設計師，愛好藝術和音樂',
      '教師，熱愛閱讀和教育',
      '創業者，喜歡挑戰和創新',
      '醫護人員，關心健康生活',
      '藝術家，追求美好的事物',
      '運動員，熱愛運動和競技',
      '音樂人，享受音樂帶來的快樂',
      '美食家，喜歡探索各地美食',
      '攝影師，用鏡頭記錄生活',
      '作家，喜歡用文字表達情感',
      '程式設計師，享受創造的樂趣',
      '心理師，關注心理健康',
      '建築師，熱愛設計和建造',
      '律師，追求公平正義',
      '會計師，細心謹慎',
      '市場營銷，創意無限',
      '護理師，溫暖有愛心',
      '學生，對未來充滿期待'
    ]
    
    const matches = []
    const firstNames = ['小', '大', '明', '麗', '強', '美', '文', '華', '建', '國', '志', '偉', '芳', '靜', '英', '敏', '秀', '紅', '玉', '霞', '軍', '傑', '輝', '鵬', '濤', '超', '勇', '剛', '磊', '波', '斌', '俊', '飛', '龍', '浩', '宇', '博', '思', '雪', '婷']
    const lastNames = ['雨', '建', '美', '小', '明', '麗', '強', '文', '華', '國', '志', '偉', '芳', '靜', '英', '敏', '秀', '紅', '玉', '霞']
    
    for (let i = 0; i < 100; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const name = i < 50 ? `${firstName}${lastName}` : `${lastName}${firstName}`
      const age = 20 + Math.floor(Math.random() * 25) // 20-44岁
      const selectedInterests = []
      const interestCount = 2 + Math.floor(Math.random() * 4) // 2-5个兴趣
      const shuffled = [...allInterests].sort(() => 0.5 - Math.random())
      for (let j = 0; j < interestCount; j++) {
        selectedInterests.push(shuffled[j])
      }
      
      matches.push({
        id: i + 1,
        name,
        age,
        location: cities[Math.floor(Math.random() * cities.length)],
        photo: photos[Math.floor(Math.random() * photos.length)],
        bio: bios[Math.floor(Math.random() * bios.length)],
        interests: selectedInterests
      })
    }
    
    return matches
  }
  
  const matches = useMemo(() => generateMatches(), [])

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
          <h1 className="text-xl font-bold text-neutral-900">每日匹配 ({matches.length})</h1>
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