import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuthing } from '@/enhance-authing-sdk'

export default function Callback () {
  const history = useHistory()
  const authing = useAuthing()

  const handleCallback = async () => {
    await authing.enchancedLoginCallback()
    history.replace('/personal')
  }

  useEffect(() => {
    handleCallback()
  }, [])

  return <div>This is Callback page</div>
}
