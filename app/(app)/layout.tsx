import React from 'react'
import Nav from '@/components/layout/nav'
import { Suspense } from 'react'

function AppLayout
({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col'>
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        <div className='border h-full border-red-200'>{children}</div>
        
    </div>
  )
}

export default AppLayout
