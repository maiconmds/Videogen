import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Youtube, FileText, Video, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

const BottomNavigation: React.FC = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/channel-analysis', icon: Youtube, label: 'Canal' },
    { path: '/script-input', icon: FileText, label: 'Roteiro' },
    { path: '/video-generation', icon: Video, label: 'Vídeo' },
    { path: '/settings', icon: Settings, label: 'Config' },
  ]

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"
                  layoutId="activeTab"
                />
              )}
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}

export default BottomNavigation