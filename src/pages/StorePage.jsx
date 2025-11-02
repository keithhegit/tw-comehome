import React, { useState } from 'react'
import { ArrowLeft, Search, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const StorePage = ({ user, mode }) => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 商品分类
  const categories = [
    { id: 'all', name: '全部', icon: '🛒' },
    { id: 'meat', name: '豬肉', icon: '🥩' },
    { id: 'eggs', name: '雞蛋', icon: '🥚' },
    { id: 'dairy', name: '乳製品', icon: '🥛' },
    { id: 'vegetables', name: '蔬菜', icon: '🥬' },
    { id: 'drinks', name: '飲料', icon: '🥤' }
  ]

  // 商品数据
  const products = [
    {
      id: 1,
      name: '豬五花肉',
      price: 20,
      originalPrice: 40,
      image: '🥩',
      category: 'meat',
      tag: '半價',
      stock: 99
    },
    {
      id: 2,
      name: '雞蛋',
      price: 10,
      originalPrice: 20,
      image: '🥚',
      category: 'eggs',
      tag: '半價',
      stock: 50
    },
    {
      id: 3,
      name: '鮮奶',
      price: 25,
      originalPrice: 50,
      image: '🥛',
      category: 'dairy',
      tag: '半價',
      stock: 30
    },
    {
      id: 4,
      name: '白菜',
      price: 8,
      originalPrice: 16,
      image: '🥬',
      category: 'vegetables',
      tag: '半價',
      stock: 20
    },
    {
      id: 5,
      name: '可樂',
      price: 5,
      originalPrice: 10,
      image: '🥤',
      category: 'drinks',
      tag: '半價',
      stock: 100
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (product) => {
    alert(`已將 ${product.name} 加入購物車！`)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* 页面头部 */}
      <header className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-neutral-600" />
            </button>
            <h1 className="text-xl font-bold text-neutral-900">商城</h1>
          </div>
          
          {/* 搜索框 */}
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="搜索豬肉、雞蛋..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* 促销横幅 */}
        <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white mb-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">慶祝統一 全場半價</h2>
            <p className="text-primary-100">全台包郵 | 滿減活動</p>
          </div>
        </div>

        {/* 商品分类 */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-neutral-700 border border-neutral-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 商品列表 */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card">
              <div className="relative mb-4">
                <div className="text-6xl text-center mb-3">{product.image}</div>
                <span className="absolute -top-2 -right-2 bg-error text-white text-xs px-2 py-1 rounded-full font-bold">
                  {product.tag}
                </span>
              </div>
              
              <h3 className="font-semibold text-neutral-900 mb-2">{product.name}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary-500">¥{product.price}</span>
                  <span className="text-sm text-neutral-400 line-through">¥{product.originalPrice}</span>
                </div>
                <p className="text-xs text-neutral-500">庫存：{product.stock}</p>
              </div>
              
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full btn-primary"
              >
                <ShoppingCart size={16} className="inline mr-2" />
                立即購買
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">沒有找到相關商品</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default StorePage