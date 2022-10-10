import { CardParams } from "./CardParams"

type addCardsAction = {
    type: 'add-cards'
    cardsListLocal: CardParams[]
    newCard: CardParams
}

type deleteCardsAction = {
    type: 'delete-cards'
    cardsListLocal: CardParams[]
    cardId: string
}

type getCardsAction = {
    type: 'get-cards'
    cardsListLocal: CardParams[]
}
  
export type ActionCards = deleteCardsAction | getCardsAction | addCardsAction
  