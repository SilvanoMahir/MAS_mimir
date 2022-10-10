import { GameParams } from "./GameParams"

export interface GameState {
    localResultTable: GameParams
    cardsSolved: number
}