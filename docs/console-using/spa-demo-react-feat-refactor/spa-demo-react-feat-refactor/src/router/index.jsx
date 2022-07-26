import * as React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import ReactAsyncLoader from '@/components/ReactAsyncLoader'

const Home = ReactAsyncLoader(() => import('@/pages/Home'))
const Login = ReactAsyncLoader(() => import('@/pages/Login'))
const Callback = ReactAsyncLoader(() => import('@/pages/Callback'))
const Personal = ReactAsyncLoader(() => import('@/pages/Personal'))

export default function RouterComponent () {
  return (
    <Router basename='/'>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/callback'>
          <Callback />
        </Route>
        <Route exact path='/personal'>
          <Personal />
        </Route>
      </Switch>
    </Router>
  )
}
