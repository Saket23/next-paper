"use client"

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
 
const SlideCanvas = dynamic(() => import('../components/SlideCanvas'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

const SessionContainer = () => {

  const handleWebviewEvents = (handleWebviewEvents: any) => {
    console.log("handleWebviewEvents", handleWebviewEvents)
  }

  useEffect(() => {
    //@ts-ignore
    window.listenWebviewEvents = handleWebviewEvents;
  }, [])
    return (
        <SlideCanvas />
    )
}

export default SessionContainer;