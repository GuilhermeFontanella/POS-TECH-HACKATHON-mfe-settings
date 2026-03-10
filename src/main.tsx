import { createRoot } from 'react-dom/client'
import Settings from './Settings/Settings.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
      <Settings />
  </QueryClientProvider>
)
