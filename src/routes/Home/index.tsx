import React, { ReactElement } from 'react'
import Page from '@/components/Page'
import { Link } from 'react-router-dom'

const Home = (): ReactElement => {
  return (
    <Page title="Home">
      <h1>Easyapp-template-react demo</h1>
      <p>This is a project with react and typescript, created by easyapp.</p>
      <Link to="/count">Go to count</Link>
    </Page>
  )
}

export default Home
