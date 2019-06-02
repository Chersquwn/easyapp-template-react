import React, { ReactElement } from 'react'
import loadable from '@loadable/component'
import { Switch, Route } from 'react-router-dom'

const Routes = (): ReactElement => (
  <Switch>
    <Route exact component={loadable(async () => import('./Home'))} path="/" />
    <Route component={loadable(async () => import('./Count'))} path="/count" />
    <Route component={loadable(async () => import('./404'))} />
  </Switch>
)

export default Routes
