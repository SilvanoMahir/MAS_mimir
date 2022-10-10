import { ActionGame } from 'models/GameActions'
import { GameState } from 'models/GameState'

export function gameReducer(state: GameState, action: ActionGame): GameState {
  switch (action.type) {
    case 'delete-game':
      return {
        ...state,
        localResultTable: initialGameState.localResultTable
      }
    
    case 'get-game':
      return {
        ...state,
        localResultTable: action.localResultTable
      }
    
    case 'update-game':
      return {
        ...state,
        localResultTable: action.localResultTable
      }
    
      case 'get-solvedCards':
      return {
        ...state,
        cardsSolved: action.cardsSolved
      }

      case 'set-solvedCards':
      return {
        ...state,
        cardsSolved: action.cardsSolvedNew
      }
  }
}

export const initialGameState: GameState = {
    localResultTable: {
      front:'', 
      cardCount: 0, 
      solved: [{
        id: "",
        front: "",
        back: "",
        answer: "",
        accepted: false} 
      ]},
      
      cardsSolved: 0 
}
