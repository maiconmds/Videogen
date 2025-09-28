import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Youtube, FileText, Settings, Zap, TrendingUp, Video } from 'lucide-react'
import { useApi } from '../contexts/ApiContext'

const Home: React.FC = () => {
  const { isConfigured } = useApi()

  const features = [
    {
      icon: TrendingUp,
      title: 'Análise de Virais',
      description: 'Analise canais e identifique padrões de vídeos virais'
    },
    {
      icon: Zap,
      title: 'IA Avançada',
      description: 'Use múltiplas IAs para criar conteúdo otimizado'
    },
    {
      icon: Video,
      title: 'Geração Automática',
      description: 'Crie vídeos completos com áudio, imagens e efeitos'
    }
  ]

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <Video className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            VideoGen
          </h1>
          <p className="text-gray-600 text-lg">
            Crie vídeos virais usando IA
          </p>
        </div>

        {!isConfigured && (
          <motion.div
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-yellow-800 text-sm">
              Configure suas APIs nas configurações para começar
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Features */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recursos Principais
        </h2>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="p-2 bg-primary-100 rounded-lg">
                <feature.icon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Link
          to={isConfigured ? "/channel-analysis" : "/settings"}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <Youtube className="w-5 h-5" />
          <span>Analisar Canal</span>
        </Link>

        <Link
          to={isConfigured ? "/script-input" : "/settings"}
          className="btn-secondary w-full flex items-center justify-center space-x-2"
        >
          <FileText className="w-5 h-5" />
          <span>Inserir Roteiro</span>
        </Link>

        {!isConfigured && (
          <Link
            to="/settings"
            className="w-full flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 py-3"
          >
            <Settings className="w-5 h-5" />
            <span>Configurar APIs</span>
          </Link>
        )}
      </motion.div>
    </div>
  )
}

export default Home