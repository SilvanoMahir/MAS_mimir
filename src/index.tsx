import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from 'App'
import { CardsProvider, GameProvider } from 'store/context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <CardsProvider>
    <GameProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GameProvider>
  </CardsProvider>
)
