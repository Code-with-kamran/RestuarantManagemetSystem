'use client'
// import POSSystem  from '@/components/pages/POS'
import {lazy, Suspense} from 'react'
const POSSystem = lazy(() => import('@/components/pages/POS')); // Adjust path as necessary
const possystem = () => {
  return (
    <div>
      <Suspense fallback={<div>loading </div>}>

        <POSSystem />
      </Suspense>
    </div>
  )
}

export default possystem
