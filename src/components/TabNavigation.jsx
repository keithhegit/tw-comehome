import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Gift, Heart, ShoppingBag, Users, User, QrCode } from 'lucide-react'

const TabNavigation = ({ tabs }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const getIcon = (IconComponent, isActive) => {
    return <IconComponent size={24} className={isActive ? 'fill-current' : ''} />
  }

  return (
    <nav className="tab-nav">
      <div className="flex h-full">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`tab-item ${isActive ? 'active' : ''}`}
            >
              {getIcon(tab.icon, isActive)}
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default TabNavigation