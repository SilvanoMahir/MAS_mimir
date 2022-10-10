import { GameParams } from "./GameParams"

type UpdateGameAction = {
    type: 'update-game'
    localResultTable: GameParams
}

type DeleteGameAction = {
    type: 'delete-game'
    localResultTable: GameParams
}

type GetGameAction = {
    type: 'get-game'
    localResultTable: GameParams
}

type GetSolvedCardsAction = {
    type: 'get-solvedCards'
    cardsSolved: number
}

type SetSolvedCardsAction = {
    type: 'set-solvedCards'
    cardsSolvedNew: number
}
  
export type ActionGame = UpdateGameAction | DeleteGameAction | GetGameAction | GetSolvedCardsAction | SetSolvedCardsAction
  