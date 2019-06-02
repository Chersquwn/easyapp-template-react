import { hot } from 'react-hot-loader/root'
import React, { ReactElement } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'

const App = (): ReactElement => {
  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default hot(App)
