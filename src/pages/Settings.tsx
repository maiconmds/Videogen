import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Eye, EyeOff, Key, CheckCircle } from 'lucide-react'
import { useApi } from '../contexts/ApiContext'
import toast from 'react-hot-toast'

const Settings: React.FC = () => {
  const { apiKeys, setApiKeys, isConfigured } = useApi()
  const [formData, setFormData] = useState(apiKeys)
  const [showKeys, setShowKeys] = useState({
    googleStudio: false,
    youtube: false,
    openRouter: false
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleShowKey = (field: keyof typeof showKeys) => {
    setShowKeys(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setApiKeys(formData)
    setIsSaving(false)
    toast.success('APIs configuradas com sucesso!')
  }

  const apiFields = [
    {
      key: 'googleStudio' as const,
      label: 'Google Studio API',
      description: 'Para geração de áudio e imagens',
      placeholder: 'Insira sua chave do Google Studio'
    },
    {
      key: 'youtube' as const,
      label: 'YouTube API',
      description: 'Para análise de canais e upload',
      placeholder: 'Insira sua chave do YouTube'
    },
    {
      key: 'openRouter' as const,
      label: 'OpenRouter API',
      description: 'Para análise de conteúdo com IA',
      placeholder: 'Insira sua chave do OpenRouter'
    }
  ]

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Status */}
        {isConfigured && (
          <motion.div
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">
              APIs configuradas com sucesso
            </span>
          </motion.div>
        )}

        {/* API Configuration */}
        <div className="space-y-6">
          {apiFields.map((field, index) => (
            <motion.div
              key={field.key}
              className="card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Key className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {field.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {field.description}
                  </p>
                </div>
              </div>

              <div className="relative">
                <input
                  type={showKeys[field.key] ? 'text' : 'password'}
                  value={formData[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => toggleShowKey(field.key)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showKeys[field.key] ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          disabled={isSaving || !formData.googleStudio || !formData.youtube || !formData.openRouter}
          className="btn-primary w-full mt-8 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSaving ? (
            <div className="loading-spinner" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>{isSaving ? 'Salvando...' : 'Salvar Configurações'}</span>
        </motion.button>

        {/* Help Text */}
        <motion.div
          className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="font-semibold text-blue-900 mb-2">
            Como obter as APIs:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Google Studio: Console do Google Cloud</li>
            <li>• YouTube: Google Developers Console</li>
            <li>• OpenRouter: openrouter.ai</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Settings