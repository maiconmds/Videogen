import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Volume2, 
  Image as ImageIcon, 
  Video, 
  Play, 
  Pause,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Wand2
} from 'lucide-react'
import { useVideo } from '../contexts/VideoContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const VideoGeneration: React.FC = () => {
  const { videoData, setVideoData } = useVideo()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDuration, setSelectedDuration] = useState(10)
  const [selectedVoice, setSelectedVoice] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState('')
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [audioPreview, setAudioPreview] = useState('')
  const [finalVideo, setFinalVideo] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)

  const durations = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
  
  const voices = [
    { id: 'voice1', name: 'João - Masculina Grave', sample: 'sample1.mp3' },
    { id: 'voice2', name: 'Maria - Feminina Suave', sample: 'sample2.mp3' },
    { id: 'voice3', name: 'Pedro - Masculina Jovem', sample: 'sample3.mp3' },
    { id: 'voice4', name: 'Ana - Feminina Profissional', sample: 'sample4.mp3' },
  ]

  useEffect(() => {
    if (!videoData.script && !videoData.selectedTitle) {
      navigate('/')
    }
  }, [videoData, navigate])

  const handleDurationSelect = (duration: number) => {
    setSelectedDuration(duration)
    setVideoData({ duration })
  }

  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId)
    setVideoData({ selectedVoice: voiceId })
  }

  const playVoiceSample = (voiceId: string) => {
    // Simular reprodução de amostra de voz
    toast.success(`Reproduzindo amostra: ${voices.find(v => v.id === voiceId)?.name}`)
  }

  const generateContent = async () => {
    if (!selectedVoice) {
      toast.error('Selecione uma voz primeiro')
      return
    }

    setIsGenerating(true)
    setCurrentStep(2)

    try {
      // Etapa 1: Gerar áudio
      setGenerationStep('Gerando áudio narrado...')
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Etapa 2: Gerar imagens
      setGenerationStep('Criando imagens baseadas no roteiro...')
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const mockImages = [
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
      
      setPreviewImages(mockImages)
      setAudioPreview('audio-preview.mp3')
      
      // Etapa 3: Gerar thumbnail
      setGenerationStep('Criando thumbnail do vídeo...')
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setVideoData({ 
        images: mockImages, 
        audioUrl: 'audio-preview.mp3',
        thumbnail: mockImages[0]
      })
      
      setCurrentStep(3)
      toast.success('Conteúdo gerado com sucesso!')
      
    } catch (error) {
      toast.error('Erro ao gerar conteúdo')
    } finally {
      setIsGenerating(false)
      setGenerationStep('')
    }
  }

  const regenerateImages = async () => {
    setIsGenerating(true)
    setGenerationStep('Regenerando imagens...')
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Novas imagens mockadas
    const newImages = [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184464/pexels-photo-3184464.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
    
    setPreviewImages(newImages)
    setIsGenerating(false)
    setGenerationStep('')
    toast.success('Imagens regeneradas!')
  }

  const generateFinalVideo = async () => {
    setIsGenerating(true)
    setGenerationStep('Criando vídeo final...')
    setCurrentStep(4)
    
    await new Promise(resolve => setTimeout(resolve, 4000))
    
    setFinalVideo('final-video.mp4')
    setIsGenerating(false)
    setGenerationStep('')
    toast.success('Vídeo criado com sucesso!')
  }

  const downloadVideo = () => {
    toast.success('Download iniciado!')
  }

  const uploadToYouTube = () => {
    toast.success('Upload para YouTube iniciado!')
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <AnimatePresence mode="wait">
        {/* Step 1: Configuration */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Duration Selection */}
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Duração do Vídeo</span>
              </h3>
              
              <div className="grid grid-cols-3 gap-2">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => handleDurationSelect(duration)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedDuration === duration
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {duration < 60 ? `${duration}s` : `${Math.floor(duration/60)}:${(duration%60).toString().padStart(2, '0')}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Selection */}
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Volume2 className="w-5 h-5" />
                <span>Escolher Voz</span>
              </h3>
              
              <div className="space-y-3">
                {voices.map((voice) => (
                  <div
                    key={voice.id}
                    className={`voice-option ${selectedVoice === voice.id ? 'selected' : ''}`}
                    onClick={() => handleVoiceSelect(voice.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{voice.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          playVoiceSample(voice.id)
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={generateContent}
              disabled={!selectedVoice}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Wand2 className="w-5 h-5" />
              <span>Gerar Conteúdo</span>
            </button>
          </motion.div>
        )}

        {/* Step 2: Generation Process */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card text-center"
          >
            <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto flex items-center justify-center mb-6">
              <Video className="w-10 h-10 text-primary-600 animate-spin-slow" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Criando o Vídeo
            </h3>
            
            <p className="text-gray-600 mb-6">
              {generationStep}
            </p>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-primary-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* Step 3: Preview and Edit */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Images Preview */}
            <div className="card mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5" />
                  <span>Imagens Geradas</span>
                </h3>
                <button
                  onClick={regenerateImages}
                  disabled={isGenerating}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                {previewImages.map((image, index) => (
                  <motion.img
                    key={index}
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  />
                ))}
              </div>
            </div>

            {/* Audio Preview */}
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Volume2 className="w-5 h-5" />
                <span>Áudio Narrado</span>
              </h3>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <div className="flex-1">
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full w-1/3"></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">0:45 / 2:30</p>
                </div>
              </div>
            </div>

            <button
              onClick={generateFinalVideo}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Video className="w-5 h-5" />
              <span>Gerar Vídeo Final</span>
            </button>
          </motion.div>
        )}

        {/* Step 4: Final Video */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isGenerating ? (
              <div className="card text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto flex items-center justify-center mb-6">
                  <Video className="w-10 h-10 text-primary-600 animate-pulse-slow" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Finalizando Vídeo
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {generationStep}
                </p>
              </div>
            ) : (
              <>
                {/* Video Preview */}
                <div className="card mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Prévia do Vídeo</span>
                  </h3>
                  
                  <div className="video-preview mb-4 flex items-center justify-center">
                    <button className="p-4 bg-white bg-opacity-80 rounded-full">
                      <Play className="w-8 h-8 text-gray-800" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 text-center">
                    Duração: {selectedDuration < 60 ? `${selectedDuration}s` : `${Math.floor(selectedDuration/60)}:${(selectedDuration%60).toString().padStart(2, '0')}`}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={downloadVideo}
                    className="btn-secondary w-full flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Salvar no Dispositivo</span>
                  </button>
                  
                  <button
                    onClick={uploadToYouTube}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Postar no YouTube</span>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VideoGeneration