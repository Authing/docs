import { createContext } from 'react'

import * as authingSDKMethods from 'authing-js-sdk'

const initialContext = {
  ...authingSDKMethods
}

const AuthingContext = createContext(initialContext)

export default AuthingContext
