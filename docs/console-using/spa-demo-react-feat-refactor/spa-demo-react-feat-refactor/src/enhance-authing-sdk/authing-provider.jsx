import React, { useState, useMemo } from 'react'

import AuthingContext from './authing-context'

import { AuthenticationClient } from 'authing-js-sdk'

import { enhancedLogin, enhancedLogout, enchancedLoginCallback } from './enhanced-sdk-methods'

const enhancedMethods = [enhancedLogin, enhancedLogout, enchancedLoginCallback]

function enchanceAuthing (_authing) {
  return enhancedMethods.reduce((_authing, method) => {
    _authing[method.name] = (...args) => method.apply(_authing, args)
    return _authing
  }, _authing)
}

export default function AuthingProvider (options) {
  const { children, ...sdkOptions } = options

  const _authing = enchanceAuthing(new AuthenticationClient(sdkOptions))

  const [authing] = useState(_authing)

  return (
    <AuthingContext.Provider value={authing}>
      {children}
    </AuthingContext.Provider>
  )
}
