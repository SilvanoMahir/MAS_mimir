import { GameCardParams } from "./GameCardParams"

export interface GameParams {
    front: string
    cardCount: number
    solved: [GameCardParams]
}