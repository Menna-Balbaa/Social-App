// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthContextProvider from './components/context/AuthContext.tsx'
import UserContextProvider from './components/context/UserContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
  <UserContextProvider>
      <App />
  </UserContextProvider>
    </AuthContextProvider>
    </QueryClientProvider>
)
