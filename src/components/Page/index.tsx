import React, { FunctionComponent, ReactNode } from 'react'
import useTitle from '@/hooks/useTitle'

interface PageProps  {
  children: ReactNode
  title: string
}

const Page: FunctionComponent<PageProps> = ({ children, title }) => {
  useTitle(title)

  return (
    <div className="page">
      {children}
    </div>
  )
}

export default Page
