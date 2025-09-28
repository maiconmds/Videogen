import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Wand2, ArrowRight } from 'lucide-react'
import { useApi } from '../contexts/ApiContext'
import { useVideo } from '../contexts/VideoContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ScriptInput: React.FC = () => {
  const { isConfigured } = useApi()
  const { setVideoData } = useVideo()
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [inputType, setInputType] = useState<'title' | 'script'>('title')
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedScript, setGeneratedScript] = useState('')

  const handleGenerate = async () => {
    if (!isConfigured) {
      toast.error('Configure as APIs primeiro')
      navigate('/settings')
      return
    }

    if (!input.trim()) {
      toast.error('Insira um título ou roteiro')
      return
    }

    setIsProcessing(true)
    
    try {
      // Simular geração de roteiro
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      let script = ''
      if (inputType === 'title') {
        script = `Olá pessoal! Hoje vamos falar sobre: ${input}

Você já se perguntou como isso realmente funciona? Bem, prepare-se porque hoje vou revelar todos os segredos que ninguém te conta.

Primeiro, precisamos entender o contexto. Muitas pessoas acreditam que é impossível, mas a verdade é bem diferente.

[Pausa dramática]

A estratégia que vou compartilhar com vocês mudou completamente minha perspectiva sobre esse assunto.

Vamos começar pelo básico...

[Continue desenvolvendo o roteiro baseado no título]

E é isso pessoal! Espero que tenham gostado do conteúdo. Deixem um like se foi útil e se inscrevam no canal para mais conteúdos como este!`
      } else {
        script = input
      }
      
      setGeneratedScript(script)
      setVideoData({ 
        selectedTitle: inputType === 'title' ? input : 'Roteiro Personalizado',
        script 
      })
      toast.success('Roteiro gerado com sucesso!')
      
    } catch (error) {
      toast.error('Erro ao processar conteúdo')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleNext = () => {
    if (!generatedScript) {
      toast.error('Gere um roteiro primeiro')
      return
    }
    navigate('/video-generation')
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Input Type Selection */}
        <div className="card mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Criar Conteúdo
          </h2>
          
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setInputType('title')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                inputType === 'title'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Título
            </button>
            <button
              onClick={() => setInputType('script')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                inputType === 'script'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Roteiro
            </button>
          </div>

          <div className="space-y-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                inputType === 'title'
                  ? 'Ex: Como Ganhar Dinheiro Online em 2024'
                  : 'Cole seu roteiro completo aqui...'
              }
              rows={inputType === 'title' ? 3 : 8}
              className="input-field resize-none"
            />
            
            <button
              onClick={handleGenerate}
              disabled={isProcessing || !input.trim()}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="loading-spinner" />
                  <span>Processando...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  <span>
                    {inputType === 'title' ? 'Gerar Roteiro' : 'Processar Roteiro'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Processing Animation */}
        {isProcessing && (
          <motion.div
            className="card text-center mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-primary-600 animate-pulse" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {inputType === 'title' ? 'Gerando Roteiro' : 'Analisando Roteiro'}
            </h3>
            <p className="text-gray-600 text-sm">
              {inputType === 'title' 
                ? 'Criando um roteiro viral baseado no seu título...'
                : 'Analisando estrutura e tom do roteiro...'
              }
            </p>
          </motion.div>
        )}

        {/* Generated Script */}
        {generatedScript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Roteiro Gerado
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {generatedScript}
                </pre>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleGenerate}
                  className="btn-secondary flex-1 flex items-center justify-center space-x-2"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Regenerar</span>
                </button>
                
                <button
                  onClick={handleNext}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ScriptInput