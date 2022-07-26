import * as React from 'react'
import { useHistory } from 'react-router-dom'

export default function Home () {
  const history = useHistory()

  return <div>
    <div>This is Home page !!!</div>
    <button onClick={() => history.push('/login')}>go to login</button>
  </div>
}
