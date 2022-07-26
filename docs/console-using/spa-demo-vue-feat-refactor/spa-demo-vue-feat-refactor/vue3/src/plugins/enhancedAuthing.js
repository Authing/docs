import { AuthenticationClient } from 'authing-js-sdk'

export function enhancedAuthing (app, options) {
  const enhancedMethods = [enhancedLogin, enhancedLogout, enchancedLoginCallback]

  function enchanceAuthing (_authing) {
    return enhancedMethods.reduce((_authing, method) => {
      _authing[method.name] = (...args) => method.apply(_authing, args)
      return _authing
    }, _authing)
  }

  const authing = enchanceAuthing(new AuthenticationClient(options))

  app.provide('$authing', authing)
}

/**
 * enhancedLogin
 * @param {String} codeChallengeDigestMethod 'S256' | 'plain'
 * @param {String} codeChallengeMethod 'S256' | 'plain'
 */
function enhancedLogin (codeChallengeDigestMethod = 'S256', codeChallengeMethod = 'S256') {
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

/**
 * 
 * @param {String} customRedirectUri 
 */
function enhancedLogout (customRedirectUri = '') {
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

async function enchancedLoginCallback () {
  const { code, codeChallenge } = getCodeAndCodeChallenge()

  const { id_token, access_token } = await getAccessTokenByCode(this, code, codeChallenge)

  const userInfo = await this.getUserInfoByAccessToken(access_token)

  setStorageCache(access_token, id_token, userInfo)
}

function getCodeAndCodeChallenge () {
  const query = parseUrlQuery()
  const { code = '' } = query
  const codeChallenge = localStorage.getItem('codeChallenge')

  return {
    code,
    codeChallenge
  }
}

async function getAccessTokenByCode (_this, code, codeChallenge) {
  return await _this.getAccessTokenByCode(code, {
    codeVerifier: codeChallenge
  })
}

function setStorageCache (accessToken, idToken, userInfo) {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('idToken', idToken)
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

function parseUrlQuery () {
  const query = {}

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
