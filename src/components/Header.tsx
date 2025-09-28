import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Video, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  const location = useLocation()
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'VideoGen'
      case '/settings':
        return 'Configurações'
      case '/channel-analysis':
        return 'Análise de Canal'
      case '/video-generation':
        return 'Geração de Vídeo'
      case '/script-input':
        return 'Inserir Roteiro'
      default:
        return 'VideoGen'
    }
  }

  return (
    <motion.header 
      className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-600 rounded-lg">
            <Video className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            {getPageTitle()}
          </h1>
        </div>
        
        {location.pathname !== '/settings' && (
          <Link 
            to="/settings"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </Link>
        )}
      </div>
    </motion.header>
  )
}

export default Header