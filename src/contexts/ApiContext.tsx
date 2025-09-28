import React, { createContext, useContext, useState, useEffect } from 'react'

interface ApiKeys {
  googleStudio: string
  youtube: string
  openRouter: string
}

interface ApiContextType {
  apiKeys: ApiKeys
  setApiKeys: (keys: ApiKeys) => void
  isConfigured: boolean
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKeys, setApiKeysState] = useState<ApiKeys>({
    googleStudio: '',
    youtube: '',
    openRouter: ''
  })

  const isConfigured = apiKeys.googleStudio && apiKeys.youtube && apiKeys.openRouter

  useEffect(() => {
    // Carregar chaves salvas do localStorage
    const savedKeys = localStorage.getItem('videogen-api-keys')
    if (savedKeys) {
      setApiKeysState(JSON.parse(savedKeys))
    }
  }, [])

  const setApiKeys = (keys: ApiKeys) => {
    setApiKeysState(keys)
    localStorage.setItem('videogen-api-keys', JSON.stringify(keys))
  }

  return (
    <ApiContext.Provider value={{ apiKeys, setApiKeys, isConfigured }}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApi = () => {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider')
  }
  return context
}