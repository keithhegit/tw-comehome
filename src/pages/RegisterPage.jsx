import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPlus, MapPin, ArrowLeft, Shield, CheckCircle } from 'lucide-react'
import { registerUser } from '../utils/userService'

const RegisterPage = ({ mode }) => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [newUserId, setNewUserId] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!name.trim()) {
      setError('請輸入姓名')
      return
    }
    
    if (!address.trim()) {
      setError('請輸入地址')
      return
    }

    setLoading(true)
    
    try {
      const newUser = registerUser(name.trim(), address.trim())
      
      // 注册成功
      setNewUserId(newUser.id)
      setRegistered(true)
      
      // 触发自定义事件通知 App 更新用户状态
      window.dispatchEvent(new Event('user-login'))
      
      // 3秒后自动跳转
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (err) {
      setError(err.message || '註冊失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/login')
  }

  if (registered) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className={mode === 'simplified' ? 'card-simplified' : 'card'}>
            <div className="text-center">
              <CheckCircle size={64} className="text-success mx-auto mb-4" />
              <h2 className={`font-bold text-neutral-900 mb-4 ${mode === 'simplified' ? 'text-3xl' : 'text-2xl'}`}>
                註冊成功！
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-primary-50 rounded-xl">
                  <p className={`text-neutral-600 mb-2 ${mode === 'simplified' ? 'text-lg' : 'text-base'}`}>
                    您的身份證號
                  </p>
                  <p className={`font-bold text-primary-500 ${mode === 'simplified' ? 'text-2xl' : 'text-xl'}`}>
                    {newUserId}
                  </p>
                </div>
                
                <p className={`text-neutral-600 ${mode === 'simplified' ? 'text-lg' : 'text-base'}`}>
                  請妥善保管您的身份證號，用於後續登錄
                </p>
              </div>
              
              <p className="text-sm text-neutral-500">
                正在跳轉到首頁...
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-sm mx-auto">
        {/* 返回按钮 */}
        <button
          onClick={handleBack}
          className="mb-6 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-neutral-600" />
        </button>

        {/* 标题 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <UserPlus size={28} className="text-primary-500" />
            <h1 className={`font-bold text-neutral-900 ${mode === 'simplified' ? 'text-3xl' : 'text-2xl'}`}>
              註冊帳號
            </h1>
          </div>
          <p className={`text-neutral-600 ${mode === 'simplified' ? 'text-lg' : 'text-base'}`}>
            填寫基本信息完成註冊，系統將自動為您分配身份證號
          </p>
        </div>

        {/* 注册表单 */}
        <div className={mode === 'simplified' ? 'card-simplified' : 'card'}>
          <form onSubmit={handleRegister} className="space-y-6">
            {/* 姓名输入 */}
            <div>
              <label className={`block mb-2 font-medium text-neutral-900 ${mode === 'simplified' ? 'text-lg' : 'text-base'}`}>
                姓名 <span className="text-error">*</span>
              </label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="請輸入您的姓名"
                  className={`input ${mode === 'simplified' ? 'h-16 text-lg' : ''}`}
                  style={{ paddingLeft: '3rem' }}
                  maxLength={50}
                />
              </div>
            </div>

            {/* 地址输入 */}
            <div>
              <label className={`block mb-2 font-medium text-neutral-900 ${mode === 'simplified' ? 'text-lg' : 'text-base'}`}>
                地址 <span className="text-error">*</span>
              </label>
              <div className="relative">
                <MapPin size={20} className="absolute left-4 top-4 text-neutral-400" />
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="請輸入您的詳細地址"
                  rows={3}
                  className={`input ${mode === 'simplified' ? 'text-lg' : ''}`}
                  style={{ paddingLeft: '3rem', paddingTop: '1rem', resize: 'vertical' }}
                  maxLength={200}
                />
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-xl">
                <p className="text-error text-sm">{error}</p>
              </div>
            )}

            {/* 注册按钮 */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary ${mode === 'simplified' ? 'btn-large' : ''} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? '註冊中...' : (
                <>
                  <UserPlus size={20} className="inline mr-2" />
                  完成註冊
                </>
              )}
            </button>
          </form>

          {/* 说明 */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <div className="flex items-start gap-3">
              <Shield size={20} className="text-primary-500 mt-0.5" />
              <div>
                <p className={`text-neutral-600 ${mode === 'simplified' ? 'text-lg' : 'text-sm'}`}>
                  <strong>重要提示：</strong>註冊成功後，系統將自動為您分配唯一的居民身份證號，請妥善保管。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 功能说明 */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className={`text-blue-800 ${mode === 'simplified' ? 'text-lg' : 'text-sm'}`}>
            💡 <strong>核心功能：</strong>如果台海開戰，打開二維碼掃碼即可快速撤離戰場
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

