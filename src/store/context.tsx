import { ActionCards } from 'models/CardsActions'
import { CardsState } from 'models/CardsState'
import { ActionGame } from 'models/GameActions'
import { GameState } from 'models/GameState'
import { createContext, ReactNode, useReducer } from 'react'
import { cardsReducer, initialCardsState } from './cardsReducer'
import { gameReducer, initialGameState } from './gameReducer'

interface AppState1 extends CardsState {
  dispatch: (action: ActionCards) => void
}

const initialState1: AppState1 = {
  ...initialCardsState,
  dispatch: (action: ActionCards) => {},
}

interface AppState2 extends GameState {
  dispatch: (action: ActionGame) => void
}

const initialState2: AppState2 = {
  ...initialGameState,
  dispatch: (action: ActionGame) => {},
}

export const CardsContext = createContext<AppState1>(initialState1)
export const GameContext = createContext<AppState2>(initialState2)

interface Props {
  children: ReactNode
}

export const CardsProvider = ({ children }: Props) => {
  const [cardsState, dispatch] = useReducer(cardsReducer, initialState1)

  const cardsStore = {
    ...cardsState,
    dispatch,
  }

  return (
    <CardsContext.Provider value={cardsStore}>{children}</CardsContext.Provider>
  )
}

export const GameProvider = ({ children }: Props) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState2)

  const gameStore = {
    ...gameState,
    dispatch,
  }
  
  return (
    <GameContext.Provider value={gameStore}>{children}</GameContext.Provider>
  )
}
