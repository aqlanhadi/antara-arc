import React from 'react'
import Nav from '@/components/layout/nav'
import { Suspense } from 'react'

function AppLayout
({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-col'>
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        <div className='mt-16 h-full max-w-screen-xl m-auto'>{children}</div>
        
    </div>
  )
}

export default AppLayout
