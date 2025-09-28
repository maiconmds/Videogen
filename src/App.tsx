import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Settings from './pages/Settings'
import ChannelAnalysis from './pages/ChannelAnalysis'
import VideoGeneration from './pages/VideoGeneration'
import ScriptInput from './pages/ScriptInput'
import { ApiProvider } from './contexts/ApiContext'
import { VideoProvider } from './contexts/VideoContext'

function App() {
  return (
    <ApiProvider>
      <VideoProvider>
        <div className="min-h-screen bg-gray-50">
          <Layout>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/channel-analysis" element={<ChannelAnalysis />} />
                <Route path="/video-generation" element={<VideoGeneration />} />
                <Route path="/script-input" element={<ScriptInput />} />
              </Routes>
            </motion.div>
          </Layout>
        </div>
      </VideoProvider>
    </ApiProvider>
  )
}

export default App