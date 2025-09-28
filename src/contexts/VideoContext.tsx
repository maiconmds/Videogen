import React, { createContext, useContext, useState } from 'react'

interface VideoData {
  channelUrl?: string
  viralVideos?: any[]
  referenceVideos?: string[]
  duration?: number
  titles?: string[]
  selectedTitle?: string
  script?: string
  selectedVoice?: string
  images?: string[]
  thumbnail?: string
  audioUrl?: string
  videoUrl?: string
  step?: number
}

interface VideoContextType {
  videoData: VideoData
  setVideoData: (data: Partial<VideoData>) => void
  resetVideoData: () => void
  currentStep: number
  setCurrentStep: (step: number) => void
}

const VideoContext = createContext<VideoContextType | undefined>(undefined)

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videoData, setVideoDataState] = useState<VideoData>({})
  const [currentStep, setCurrentStep] = useState(1)

  const setVideoData = (data: Partial<VideoData>) => {
    setVideoDataState(prev => ({ ...prev, ...data }))
  }

  const resetVideoData = () => {
    setVideoDataState({})
    setCurrentStep(1)
  }

  return (
    <VideoContext.Provider value={{ 
      videoData, 
      setVideoData, 
      resetVideoData, 
      currentStep, 
      setCurrentStep 
    }}>
      {children}
    </VideoContext.Provider>
  )
}

export const useVideo = () => {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider')
  }
  return context
}