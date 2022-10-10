import { ActionCards } from 'models/CardsActions'
import { CardsState } from 'models/CardsState'

export function cardsReducer(state: CardsState, action: ActionCards): CardsState {
  switch (action.type) {
    case 'add-cards':
      return {
        ...state,
        cardsListLocal: [...action.cardsListLocal, action.newCard] 
      }

    case 'delete-cards':
      return {
        ...state,
        cardsListLocal: state.cardsListLocal.filter(cards => cards.id !== action.cardId)
      }
    
    case 'get-cards':
      return {
        ...state,
        cardsListLocal: action.cardsListLocal
      }
  }
}

export const initialCardsState: CardsState = {
  cardsListLocal: []
}
