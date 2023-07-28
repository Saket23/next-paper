"use client"

import dynamic from 'next/dynamic'
 
const SlideCanvas = dynamic(() => import('../components/SlideCanvas'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

const SessionContainer = () => {
    return (
        <SlideCanvas />
    )
}

export default SessionContainer;