import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp, Eye, Clock, ArrowRight } from 'lucide-react'
import { useApi } from '../contexts/ApiContext'
import { useVideo } from '../contexts/VideoContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ChannelAnalysis: React.FC = () => {
  const { isConfigured } = useApi()
  const { setVideoData } = useVideo()
  const navigate = useNavigate()
  const [channelUrl, setChannelUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!isConfigured) {
      toast.error('Configure as APIs primeiro')
      navigate('/settings')
      return
    }

    if (!channelUrl) {
      toast.error('Insira o link do canal')
      return
    }

    setIsAnalyzing(true)
    
    try {
      // Simular análise do canal
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const mockResult = {
        channelName: 'Canal Exemplo',
        subscribers: '1.2M',
        viralVideos: [
          {
            id: '1',
            title: 'Como Ganhar Dinheiro Online em 2024 (MÉTODO SECRETO)',
            views: '2.1M',
            thumbnail: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: 'Descubra o método que mudou minha vida...',
            duration: '12:34'
          },
          {
            id: '2',
            title: 'A VERDADE que Ninguém te Conta sobre Investimentos',
            views: '1.8M',
            thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: 'Revelações chocantes sobre o mercado...',
            duration: '15:22'
          },
          {
            id: '3',
            title: 'Transformei R$100 em R$10.000 em 30 Dias',
            views: '3.5M',
            thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: 'A estratégia que ninguém esperava...',
            duration: '18:45'
          }
        ]
      }
      
      setAnalysisResult(mockResult)
      setVideoData({ channelUrl, viralVideos: mockResult.viralVideos })
      toast.success('Análise concluída!')
      
    } catch (error) {
      toast.error('Erro ao analisar canal')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleNext = () => {
    navigate('/video-generation')
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Input Section */}
        <div className="card mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Analisar Canal
          </h2>
          <p className="text-gray-600 mb-4">
            Insira o link do canal para analisar os vídeos mais virais
          </p>
          
          <div className="space-y-4">
            <input
              type="url"
              value={channelUrl}
              onChange={(e) => setChannelUrl(e.target.value)}
              placeholder="https://youtube.com/@canal"
              className="input-field"
            />
            
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !channelUrl}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <div className="loading-spinner" />
                  <span>Analisando...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Analisar Canal</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Animation */}
        {isAnalyzing && (
          <motion.div
            className="card text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-primary-600 animate-pulse" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Analisando Canal
              </h3>
              <p className="text-gray-600 text-sm">
                Identificando padrões de vídeos virais...
              </p>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Vídeos Mais Virais
              </h3>
              
              <div className="space-y-4">
                {analysisResult.viralVideos.map((video: any, index: number) => (
                  <motion.div
                    key={video.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex space-x-3">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-20 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                          {video.title}
                        </h4>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{video.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{video.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <span>Próxima Etapa</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ChannelAnalysis