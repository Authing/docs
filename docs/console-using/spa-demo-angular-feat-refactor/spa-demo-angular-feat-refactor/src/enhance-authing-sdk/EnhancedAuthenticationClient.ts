import { AuthenticationClient, AuthenticationClientOptions } from 'authing-js-sdk'

export * from 'authing-js-sdk'

type Method = 'S256' | 'plain'

export class EnhancedAuthenticationClient extends AuthenticationClient {
  constructor (config: AuthenticationClientOptions) {
    super(config)
  }

  enhancedLogin (codeChallengeDigestMethod: Method = 'S256', codeChallengeMethod: Method = 'S256') {
    // 生成一个 code_verifier
    const codeChallenge = this.generateCodeChallenge()

    localStorage.setItem('codeChallenge', codeChallenge)
    
    // 计算 code_verifier 的 SHA256 摘要
    const codeChallengeDigest = this.getCodeChallengeDigest({
      codeChallenge,
      method: codeChallengeDigestMethod
    })

    // 构造 OIDC 授权码 + PKCE 模式登录 URL
    const url = this.buildAuthorizeUrl({
      codeChallenge: codeChallengeDigest, 
      codeChallengeMethod: codeChallengeMethod
    })

    window.location.href = url
  }

  enhancedLogout (customRedirectUri = '') {
    const redirectUri = window.location.origin
    const idToken = localStorage.getItem('idToken')

    if (idToken) {
      this.buildLogoutUrl({
        expert: true,
        redirectUri,
        idToken
      })
    }

    localStorage.clear()

    window.location.href = customRedirectUri || redirectUri
  }

  async enchancedLoginCallback () {
    const { code, codeChallenge } = getCodeAndCodeChallenge()

    const { id_token, access_token } = await getAccessTokenByCode(this, code, codeChallenge)

    const userInfo = await this.getUserInfoByAccessToken(access_token)

    setStorageCache(access_token, id_token, userInfo)
  }
}

function getCodeAndCodeChallenge () {
  const query = parseUrlQuery()
  const { code = '' } = query
  const codeChallenge = localStorage.getItem('codeChallenge') || ''

  return {
    code,
    codeChallenge
  }
}

async function getAccessTokenByCode (_this: AuthenticationClient, code: string, codeChallenge: string) {
  return await _this.getAccessTokenByCode(code, {
    codeVerifier: codeChallenge
  })
}

function setStorageCache (accessToken: string, idToken: string, userInfo: Record<string, unknown>) {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('idToken', idToken)
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

function parseUrlQuery () {
  const query: Record<string, string> = {}

  const queryString = window.location.search.split('?')[1]
  
  if (!queryString) {
    return query
  }

  queryString.split('&').forEach(item => {
    const [key, value] = item.split('=')
    query[key] = value
  })

  return query
}
