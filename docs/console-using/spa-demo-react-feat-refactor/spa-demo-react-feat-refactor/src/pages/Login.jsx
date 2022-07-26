import React, { useState, useEffect } from 'react'
import { useAuthing } from '@/enhance-authing-sdk'

export default function Login () {
  const [userInfo, setUserInfo] = useState('')
  const authing = useAuthing()

  const getCurrentUser = async () => {
    const _userInfo = await authing.getCurrentUser()
    setUserInfo(_userInfo && JSON.stringify(_userInfo, null, 2) || '')
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  const onLogin = () => authing.enhancedLogin()
  const onLogout = () => authing.enhancedLogout()

  return <div>
    <div>This is Login page</div>
    {userInfo ? <button onClick={onLogout}>登出</button> : <button onClick={onLogin}>登录</button>}
    {userInfo && <div>
      <div>用户信息：</div>
      <textarea cols="100" rows="30" defaultValue={userInfo}></textarea>
    </div>}
  </div>
}
