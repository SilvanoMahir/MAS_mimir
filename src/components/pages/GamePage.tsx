import { NewGame } from 'components/widgets/NewGame'
import { Progress } from 'components/widgets/Progress'
import { CardsResults } from 'components/widgets/CardsResults'
import { useContext } from 'react'
import { GameContext } from 'store/context'
import { NO_CARDS_SOLVED_COUNT } from 'App'

export default function GamePage() {
  let { localResultTable, cardsSolved } = useContext(GameContext)

  return (
    <div>
      {cardsSolved === NO_CARDS_SOLVED_COUNT ? (
        <NewGame />
      ) : cardsSolved <= localResultTable.cardCount ? (
        <Progress />
      ) : cardsSolved > localResultTable.cardCount ? (
        <CardsResults />
      ) : null}
    </div>
  )
}
