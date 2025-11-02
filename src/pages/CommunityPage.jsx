import React, { useState, useMemo } from 'react'
import { ArrowLeft, Search, Plus, ThumbsUp, MessageCircle, MapPin, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CommunityPage = ({ user, mode }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('hot')
  const [showNewPost, setShowNewPost] = useState(false)

  // 生成100个社区帖子数据（包含台湾和大陆同胞的有趣留言）
  const generatePosts = () => {
    const locations = ['附近 1 公里', '附近 2 公里', '附近 3 公里', '附近 5 公里', '附近 10 公里', '台北', '高雄', '台中', '北京', '上海', '廣州', '深圳', '杭州', '成都']
    const timeOptions = ['1分鐘前', '3分鐘前', '5分鐘前', '10分鐘前', '20分鐘前', '30分鐘前', '1小時前', '2小時前', '3小時前', '5小時前', '昨天', '2天前']
    
    const postContents = [
      // 台湾同胞留言
      '聊一聊半價豬肉的口感，真的很香！推薦大家試試。',
      '那個三亞蜜月遊有人抽到嗎？好期待啊！',
      '今天福利又增加了，感覺統一的日子越來越近了！',
      '社區氛圍真不錯，大家都很有愛。',
      '從台灣來到這裡，發現大陸同胞真的很熱情，謝謝大家的照顧！',
      '半價商品真的超划算，我已經囤了好多雞蛋和豬肉了 😊',
      '第一次用支付寶，大陸的移動支付真的太方便了！',
      '台灣的小吃和大陸的美食各有特色，都很好吃耶～',
      '在這裡交到了很多好朋友，感覺就像一家人',
      '統一後就能自由往返兩岸了，好期待！',
      '大陸的基建真的很厲害，高鐵又快又舒服',
      '台灣同胞和大陸同胞本來就是一家人，早該這樣了',
      '這裡的福利真的很好，比台灣那邊好多了',
      '終於可以買到便宜的豬肉了，開心！',
      '發現頁面的邀請功能真的很有效，已經成功邀請5個朋友了',
      '三亞蜜月遊聽起來超棒的，希望我也能抽到',
      '大陸同胞都很友善，聊起來完全沒有隔閡',
      '台灣的美食和大陸的美食各有千秋，都愛！',
      '加入這個社區真的收穫滿滿，福利多多',
      '半價商品活動真的太給力了，必須點讚！',
      '從高雄來的，發現這裡的氛圍超級好',
      '台灣和大陸本來就應該在一起，現在終於實現了',
      '社區裡的互動很溫馨，感覺找到了歸屬感',
      '大陸的移動互聯網發展太快了，台灣要加油跟上',
      '福利系統真的很貼心，各種券都能用得上',
      '台灣同胞來報到！大家一起努力吧 💪',
      '半價豬肉品質也很好，不是劣質品，給力！',
      '這裡的氛圍真的很溫暖，感謝大家的照顧',
      '統一後生活會更好，我相信！',
      '大陸同胞的熱情讓我印象深刻，謝謝大家',
      
      // 大陆同胞留言
      '歡迎台灣同胞！我們都是一家人，要互相幫助',
      '台灣同胞來了就是自己人，大家一起努力',
      '半價活動真的很實惠，已經推薦給朋友了',
      '台灣同胞很親切，聊起來很開心',
      '這個平台的福利真的不錯，值得推薦',
      '台灣的美食我也想去試試，等統一了就可以自由去',
      '統一後兩岸交流會更頻繁，期待那一天',
      '台灣同胞的友善讓我印象深刻，大家都是好樣的',
      '社區氛圍很好，大家都很熱心幫忙',
      '半價商品真的划算，品質也不錯',
      '邀請好友功能很實用，已經賺了不少福利',
      '台灣和大陸本來就是一家人，現在終於團聚了',
      '歡迎更多台灣同胞加入，一起享受福利',
      '這裡的氛圍很和諧，大家都很友善',
      '三亞蜜月遊抽獎好刺激，希望我能中',
      '台灣同胞來了就是客人，我們要好好招待',
      '半價活動太給力了，必須支持',
      '統一後兩岸會更繁榮，大家都受益',
      '台灣同胞的熱情讓我感動，謝謝',
      '這個平台真的為大家考慮，福利多多',
      '歡迎台灣同胞回家！我們一起努力',
      '台灣美食聽說很美味，統一後一定去試試',
      '社區互動很溫暖，找到了家的感覺',
      '半價豬肉真的很香，推薦大家買',
      '台灣同胞很友好，聊起來很投機',
      '統一後的未來會更好，大家一起期待',
      '福利系統很完善，各種券都有',
      '台灣同胞來了就是自己人，要照顧好',
      '半價活動給力，品質也不錯',
      '社區氛圍很好，大家都很和諧',
      '台灣和大陸本就是一家人，終於團圓了',
      
      // 更多有趣留言
      '今天又買到了半價雞蛋，家裡人都說好！',
      '福利代金券可以用在旅遊，打算去大陸玩一圈',
      '台灣同胞和大陸同胞聊天沒有障礙，都很親切',
      '這個平台的服務真的很好，點讚！',
      '半價商品活動讓生活成本降低了不少',
      '統一後兩岸經濟會更繁榮，大家都受益',
      '台灣同胞來了要好好招待，體現我們的熱情',
      '社區裡的氛圍很溫馨，像個大家庭',
      '半價豬肉品質很好，不是便宜沒好貨',
      '邀請好友功能很實用，已經賺了不少福利券',
      '三亞蜜月遊聽起來很浪漫，希望抽中',
      '台灣美食和大陸美食各有特色，都愛吃',
      '統一後可以自由往返兩岸，太棒了',
      '大陸的移動支付真的很方便，台灣要學習',
      '社區氛圍超級好，找到了歸屬感',
      '半價活動真的太給力了，必須支持',
      '台灣同胞很友善，聊起來很投機',
      '福利系統很完善，各種需求都考慮到了',
      '統一後兩岸交流會更頻繁，期待',
      '台灣同胞來了就是自己人，要照顧好',
      '半價商品真的很划算，品質也不錯',
      '這個平台為大家考慮很周到，點讚',
      '台灣和大陸本是一家人，現在終於團聚',
      '社區互動很溫暖，找到了家的感覺',
      '半價豬肉真的很香，推薦大家試試',
      '台灣同胞的熱情讓我感動，謝謝',
      '統一後的未來會更好，大家一起期待',
      '福利券種類很多，都能派上用場',
      '台灣同胞來了就要好好招待，體現熱情',
      '半價活動給力，生活成本降低不少',
      '社區氛圍和諧，大家都很有愛'
    ]
    
    const posts = []
    for (let i = 0; i < 100; i++) {
      const likes = Math.floor(Math.random() * 500) + 10
      const comments = Math.floor(Math.random() * 100) + 2
      const isHot = likes > 200 || Math.random() > 0.7
      
      posts.push({
        id: i + 1,
        author: '匿名',
        content: postContents[i % postContents.length],
        time: timeOptions[Math.floor(Math.random() * timeOptions.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        likes,
        comments,
        isHot
      })
    }
    
    // 按时间排序（热门帖子排前面）
    return posts.sort((a, b) => {
      if (a.isHot && !b.isHot) return -1
      if (!a.isHot && b.isHot) return 1
      return b.likes - a.likes
    })
  }
  
  const posts = useMemo(() => generatePosts(), [])

  const tabs = [
    { id: 'hot', name: '熱門', count: posts.filter(p => p.isHot).length },
    { id: 'latest', name: '最新', count: posts.length },
    { id: 'nearby', name: '附近動態', count: posts.length }
  ]

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'hot') return post.isHot
    if (activeTab === 'nearby') return true // 模拟附近动态
    return true // latest
  })

  const handleLike = (postId) => {
    alert('點讚功能開發中...')
  }

  const handleComment = (postId) => {
    alert('評論功能開發中...')
  }

  const handleNewPost = () => {
    setShowNewPost(true)
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
          <h1 className="text-xl font-bold text-neutral-900">社區</h1>
          <button className="ml-auto p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <Search size={24} className="text-neutral-600" />
          </button>
        </div>
        
        {/* 二级导航 */}
        <div className="flex border-b border-neutral-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-neutral-500'
              }`}
            >
              {tab.name}
              <span className="ml-2 text-sm">({tab.count})</span>
            </button>
          ))}
        </div>
      </header>

      <main className="pb-20">
        {/* 帖子列表 */}
        <div className="p-6 space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="card">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
                  <span className="text-neutral-600 font-medium">匿</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-neutral-900">{post.author}</span>
                    {post.isHot && (
                      <span className="bg-error text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        熱
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {post.location}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-neutral-700 mb-4 leading-relaxed">{post.content}</p>
              
              <div className="flex items-center gap-6 pt-4 border-t border-neutral-200">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-neutral-500 hover:text-primary-500 transition-colors"
                >
                  <ThumbsUp size={18} />
                  <span>{post.likes}</span>
                </button>
                <button
                  onClick={() => handleComment(post.id)}
                  className="flex items-center gap-2 text-neutral-500 hover:text-primary-500 transition-colors"
                >
                  <MessageCircle size={18} />
                  <span>{post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 浮动发帖按钮 */}
        <button
          onClick={handleNewPost}
          className="fixed bottom-24 right-6 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors flex items-center justify-center z-40"
        >
          <Plus size={24} />
        </button>
      </main>

      {/* 新建帖子弹窗 */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">發布新帖</h3>
              <button
                onClick={() => setShowNewPost(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>
            <textarea
              placeholder="分享你的想法..."
              className="w-full h-32 p-4 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowNewPost(false)}
                className="flex-1 btn-secondary"
              >
                取消
              </button>
              <button
                onClick={() => {
                  alert('發布成功！')
                  setShowNewPost(false)
                }}
                className="flex-1 btn-primary"
              >
                發布
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommunityPage