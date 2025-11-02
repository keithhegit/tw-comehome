import React from 'react'
import { Gift, Lock, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BenefitsCard = ({ user, mode }) => {
  const navigate = useNavigate()

  if (!user) return null

  const benefits = [
    {
      type: 'travel',
      label: '旅遊代金券',
      value: `¥${user.benefits.travel}`,
      icon: '🏖️'
    },
    {
      type: 'game',
      label: '遊戲點券',
      value: `${user.benefits.gamePoints} 點`,
      icon: '🎮'
    },
    {
      type: 'eggs',
      label: '雞蛋兌換券',
      value: `${user.benefits.eggs} 張`,
      icon: '🥚'
    }
  ]

  return (
    <div className={mode === 'simplified' ? 'card-simplified' : 'card'}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
          <Gift size={24} className="text-primary-500" />
          福利
        </h3>
        <button
          onClick={() => navigate('/benefits')}
          className="flex items-center gap-1 text-primary-500 font-medium hover:text-primary-700 transition-colors"
        >
          查看詳情
          <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{benefit.icon}</span>
              <span className={mode === 'simplified' ? 'text-lg font-semibold' : 'text-base'}>
                {benefit.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-semibold text-primary-500 ${mode === 'simplified' ? 'text-lg' : 'text-base'}`}>
                {benefit.value}
              </span>
              <Lock size={16} className="text-neutral-400" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-neutral-200">
        <p className="text-sm text-neutral-500 flex items-center gap-1">
          <Lock size={14} />
          *福利在哪天統一哪天發放
        </p>
      </div>
    </div>
  )
}

export default BenefitsCard