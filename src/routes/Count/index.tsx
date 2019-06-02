import React, { useState, ReactElement } from 'react'
import Page from '@/components/Page'
import './styles.scss'

const Count = (): ReactElement => {
  const [count, setCount] = useState(0)

  return (
    <Page title="Count">
      <h1>Counter</h1>
      <div styleName="container">
        <button
          styleName="button"
          type="button"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <p styleName="text">{count}</p>
        <button
          styleName="button"
          type="button"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </Page>
  )
}

export default Count
