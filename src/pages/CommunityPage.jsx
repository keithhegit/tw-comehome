import React, { useState } from 'react'
import { ArrowLeft, Search, Plus, ThumbsUp, MessageCircle, MapPin, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CommunityPage = ({ user, mode }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('hot')
  const [showNewPost, setShowNewPost] = useState(false)

  // 模拟帖子数据
  const posts = [
    {
      id: 1,
      author: '匿名',
      content: '聊一聊半價豬肉的口感，真的很香！推薦大家試試。',
      time: '5分鐘前',
      location: '附近 1 公里',
      likes: 152,
      comments: 18,
      isHot: true
    },
    {
      id: 2,
      author: '匿名',
      content: '那個三亞蜜月遊有人抽到嗎？好期待啊！',
      time: '20分鐘前',
      location: '附近 5 公里',
      likes: 98,
      comments: 12,
      isHot: false
    },
    {
      id: 3,
      author: '匿名',
      content: '今天福利又增加了，感覺統一的日子越來越近了！',
      time: '1小時前',
      location: '附近 3 公里',
      likes: 234,
      comments: 45,
      isHot: true
    },
    {
      id: 4,
      author: '匿名',
      content: '社區氛圍真不錯，大家都很有愛。',
      time: '2小時前',
      location: '附近 2 公里',
      likes: 67,
      comments: 8,
      isHot: false
    }
  ]

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