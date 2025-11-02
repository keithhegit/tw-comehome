import React from 'react'
import { ShoppingBag, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const StoreCard = ({ mode }) => {
  const navigate = useNavigate()

  // 模拟商品数据
  const products = [
    {
      id: 1,
      name: '豬肉',
      price: 20,
      originalPrice: 40,
      image: '🥩',
      tag: '半價'
    },
    {
      id: 2,
      name: '雞蛋',
      price: 10,
      originalPrice: 20,
      image: '🥚',
      tag: '半價'
    },
    {
      id: 3,
      name: '牛奶',
      price: 25,
      originalPrice: 50,
      image: '🥛',
      tag: '半價'
    }
  ]

  return (
    <div className={mode === 'simplified' ? 'card-simplified' : 'card'}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
          <ShoppingBag size={24} className="text-primary-500" />
          商城
        </h3>
        <button
          onClick={() => navigate('/store')}
          className="flex items-center gap-1 text-primary-500 font-medium hover:text-primary-700 transition-colors"
        >
          進入商城
          <ChevronRight size={16} />
        </button>
      </div>
      
      {/* 商品展示 */}
      <div className="grid grid-cols-3 gap-3">
        {products.map((product) => (
          <div key={product.id} className="text-center">
            <div className="relative mb-2">
              <div className="text-4xl mb-2">{product.image}</div>
              <span className="absolute -top-1 -right-1 bg-error text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                {product.tag}
              </span>
            </div>
            <p className="text-sm font-medium text-neutral-900 mb-1">{product.name}</p>
            <div className="space-y-1">
              <p className="text-primary-500 font-bold">¥{product.price}</p>
              <p className="text-xs text-neutral-400 line-through">¥{product.originalPrice}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-neutral-200">
        <div className="flex items-center justify-center gap-4 text-sm text-neutral-600">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-success rounded-full"></span>
            全台包郵
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-warning rounded-full"></span>
            滿減活動
          </span>
        </div>
      </div>
    </div>
  )
}

export default StoreCard