import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, ArrowLeft, User, Shield } from 'lucide-react'
import { loginById } from '../utils/userService'

const LoginPage = ({ mode }) => {
  const navigate = useNavigate()
  const [idCard, setIdCard] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!idCard.trim()) {
      setError('請輸入身份證號')
      return
    }

    setLoading(true)
    
    try {
      const user = loginById(idCard.trim())
      
      if (user) {
        // 登录成功，触发自定义事件通知 App 更新用户状态
        window.dispatchEvent(new Event('user-login'))
        navigate('/')
      } else {
        setError('身份證號不存在，請先註冊')
      }
    } catch (err) {
      setError(err.message || '登錄失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo/标题 */}
        <div className="text-center mb-8">
          <h1 className={`font-bold text-neutral-900 mb-2 ${mode === 'simplified' ? 'text-4xl' : 'text-3xl'}`}>
            有出息
          </h1>
          <p className={`text-neutral-600 ${mode === 'simplified' ? 'text-lg' : 'text-base'}`}>
            從從容容，游刃有余
          </p>
        </div>

        {/* 登录卡片 */}
        <div className={mode === 'simplified' ? 'card-simplified' : 'card'}>
          <div className="flex items-center gap-3 mb-6">
            <Shield size={28} className="text-primary-500" />
            <h2 className={`font-bold text-neutral-900 ${mode === 'simplified' ? 'text-3xl' : 'text-2xl'}`}>
              身份驗證登錄
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* 身份证号输入 */}
            <div>
              <label className={`block mb-2 font-medium text-neutral-900 ${mode === 'simplified' ? 'text-lg' : 'text-base'}`}>
                居民身份證號
              </label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={idCard}
                  onChange={(e) => setIdCard(e.target.value)}
                  placeholder="請輸入您的身份證號"
                  className={`input ${mode === 'simplified' ? 'h-16 text-lg' : ''}`}
                  style={{ paddingLeft: '3rem' }}
                  maxLength={18}
                />
              </div>
              <p className="mt-2 text-sm text-neutral-500">
                首次使用請先註冊
              </p>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-xl">
                <p className="text-error text-sm">{error}</p>
              </div>
            )}

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary ${mode === 'simplified' ? 'btn-large' : ''} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? '登錄中...' : (
                <>
                  <LogIn size={20} className="inline mr-2" />
                  登錄
                </>
              )}
            </button>
          </form>

          {/* 注册链接 */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <p className={`text-center text-neutral-600 mb-4 ${mode === 'simplified' ? 'text-lg' : 'text-base'}`}>
              還沒有帳號？
            </p>
            <button
              onClick={handleRegister}
              className="w-full btn-secondary"
            >
              立即註冊
            </button>
          </div>
        </div>

        {/* 说明文字 */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className={`text-blue-800 text-center ${mode === 'simplified' ? 'text-lg' : 'text-sm'}`}>
            💡 如果台海開戰，打開二維碼掃碼即可快速撤離戰場
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

