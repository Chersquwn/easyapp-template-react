import { hot } from 'react-hot-loader/root'
import React from 'react'
import Page from '@/components/Page'

const App = () => {
  return (
    <Page title="easyapp-template-react demo">
      <h1>Easyapp-template-react demo</h1>
      <p>This is a project with react and typescript, created by easyapp.</p>
    </Page>
  )
}

export default hot(App)
