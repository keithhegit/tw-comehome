import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

const CredentialCard = ({ user, onViewFullscreen }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (user) {
      // 生成投诚凭证二维码
      const credentialData = {
        userId: user.id,
        name: user.name,
        timestamp: Date.now(),
        type: '投誠憑證'
      }
      
      QRCode.toDataURL(JSON.stringify(credentialData), {
        width: 200,
        margin: 2,
        color: {
          dark: '#0057B7',
          light: '#FFFFFF'
        }
      }).then(url => {
        setQrCodeUrl(url)
      })
    }
  }, [user])

  if (!user) return null

  return (
    <div className="card bg-primary-500 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">投誠</h3>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="p-2 hover:bg-primary-700 rounded-lg transition-colors"
        >
          {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      
      <p className="text-primary-100 mb-6">
        關鍵時刻保命，點擊查看憑證。
      </p>
      
      {showPreview && qrCodeUrl && (
        <div className="bg-white rounded-xl p-4 mb-4">
          <img src={qrCodeUrl} alt="投誠憑證" className="w-24 h-24 mx-auto" />
        </div>
      )}
      
      <button
        onClick={onViewFullscreen}
        className="w-full bg-white text-primary-500 font-bold py-4 rounded-xl hover:bg-neutral-50 transition-colors duration-200"
      >
        立即查看/全屏顯示
      </button>
      
      <div className="mt-4 text-sm text-primary-100">
        <p>用戶：{user.name}</p>
        <p>ID：{user.id}</p>
      </div>
    </div>
  )
}

export default CredentialCard