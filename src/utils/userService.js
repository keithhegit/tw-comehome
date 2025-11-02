// 用户数据管理服务
// 使用 localStorage 存储用户数据，并提供 JSON 导出功能

const STORAGE_KEY = 'users_data'
const CURRENT_USER_KEY = 'current_user'

/**
 * 生成唯一身份证号（310开头，18位）
 */
const generateIdCard = () => {
  const prefix = '310'
  const timestamp = Date.now().toString().slice(-10)
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return prefix + timestamp + random
}

/**
 * 初始化用户数据存储
 */
const initUsersData = () => {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    const initialData = {
      users: [],
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
  }
}

/**
 * 获取所有用户数据
 */
export const getAllUsers = () => {
  initUsersData()
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY))
  return data.users || []
}

/**
 * 保存用户数据
 */
export const saveUser = (userData) => {
  initUsersData()
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  // 检查是否已存在相同身份证号的用户
  const existingIndex = data.users.findIndex(u => u.id === userData.id)
  
  if (existingIndex >= 0) {
    // 更新现有用户
    data.users[existingIndex] = {
      ...data.users[existingIndex],
      ...userData,
      updatedAt: new Date().toISOString()
    }
  } else {
    // 添加新用户
    data.users.push({
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  }
  
  data.lastUpdated = new Date().toISOString()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  
  return userData
}

/**
 * 根据身份证号查找用户
 */
export const getUserById = (id) => {
  const users = getAllUsers()
  return users.find(u => u.id === id) || null
}

/**
 * 根据身份证号登录
 */
export const loginById = (id) => {
  const user = getUserById(id)
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    return user
  }
  return null
}

/**
 * 注册新用户
 */
export const registerUser = (name, address) => {
  // 检查姓名和地址是否为空
  if (!name || !name.trim()) {
    throw new Error('姓名不能為空')
  }
  if (!address || !address.trim()) {
    throw new Error('地址不能為空')
  }
  
  // 生成身份证号
  const idCard = generateIdCard()
  
  // 创建用户数据
  const newUser = {
    id: idCard,
    name: name.trim(),
    address: address.trim(),
    level: '新用戶',
    invitedCount: 0,
    nextLevel: '党组领导',
    needMore: 10,
    benefits: {
      travel: 0,
      gamePoints: 0,
      eggs: 0
    }
  }
  
  // 保存用户
  const savedUser = saveUser(newUser)
  
  // 自动登录
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(savedUser))
  
  return savedUser
}

/**
 * 获取当前登录用户
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem(CURRENT_USER_KEY)
  if (!userStr) return null
  
  try {
    const user = JSON.parse(userStr)
    // 从用户列表中获取最新数据
    const latestUser = getUserById(user.id)
    return latestUser || user
  } catch (e) {
    return null
  }
}

/**
 * 登出
 */
export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
}

/**
 * 更新当前用户数据
 */
export const updateCurrentUser = (updates) => {
  const currentUser = getCurrentUser()
  if (!currentUser) return null
  
  const updatedUser = {
    ...currentUser,
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  saveUser(updatedUser)
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))
  
  return updatedUser
}

/**
 * 导出所有用户数据为 JSON
 */
export const exportUsersData = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  return JSON.stringify(data, null, 2)
}

/**
 * 导入用户数据（从 JSON）
 */
export const importUsersData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString)
    if (data.users && Array.isArray(data.users)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      return true
    }
    return false
  } catch (e) {
    console.error('导入用户数据失败:', e)
    return false
  }
}

// 初始化
initUsersData()

