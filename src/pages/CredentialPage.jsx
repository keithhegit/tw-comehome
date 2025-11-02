import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode'

const CredentialPage = ({ user, mode, onClose }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // 强制屏幕亮度最大（模拟）
    document.body.style.filter = 'brightness(1.2)'
    
    // 生成投诚凭证二维码
    if (user) {
      const credentialData = {
        userId: user.id,
        name: user.name,
        timestamp: Date.now(),
        type: '投誠憑證',
        status: '有效'
      }
      
      QRCode.toDataURL(JSON.stringify(credentialData), {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }).then(url => {
        setQrCodeUrl(url)
      })
    }

    // 更新时间
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // 清理函数
    return () => {
      document.body.style.filter = ''
      clearInterval(timer)
    }
  }, [user])

  // 阻止所有交互，只允许物理返回键
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [onClose])

  if (!user) return null

  return (
    <div className="pressure-mode">
      {/* 标题 */}
      <h1>請向「步兵掃碼營」出示此憑證</h1>
      
      {/* 二维码容器 */}
      <div className="qr-container">
        {qrCodeUrl && (
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <img 
              src={qrCodeUrl} 
              alt="投誠憑證" 
              className="w-full h-auto max-w-sm mx-auto"
            />
          </div>
        )}
      </div>
      
      {/* 用户信息 */}
      <div className="user-info">
        <p>用戶：{user.name}</p>
        <p>ID：{user.id}</p>
        <p>生成時間：{currentTime.toLocaleString('zh-TW')}</p>
      </div>
      
      {/* 提示文字 */}
      <div className="text-center mt-8">
        <p className="text-neutral-600">
          此憑證為動態生成，請在有效期內使用
        </p>
      </div>
      
      {/* 隐藏的关闭按钮（仅在开发时可见） */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        style={{ fontSize: '16px', padding: '8px' }}
      >
        ✕
      </button>
    </div>
  )
}

export default CredentialPage