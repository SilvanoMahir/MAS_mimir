import styled from 'styled-components/macro'
import { ManageCardsButton, NewGameButton } from '../controls/Button'
import { useNavigate } from 'react-router-dom'
import {
  NO_CARDS_SOLVED_COUNT,
  ROUTE_CARDSOVERVIEWPAGE,
  ROUTE_GAMEPAGE,
} from 'App'
import { useContext } from 'react'
import { GameContext } from 'store/context'

export const NavBar = () => {
  let { localResultTable, cardsSolved } = useContext(GameContext)
  let navigate = useNavigate()

  const getButtonText = () => {
    switch (cardsSolved) {
      case NO_CARDS_SOLVED_COUNT:
        return 'New Game'
      case localResultTable.cardCount + 1:
        return 'Finished'
      default:
        return `Solve #${cardsSolved}`
    }
  }

  const routePage = () => {
    if (
      localResultTable.solved.length <= localResultTable.cardCount ||
      localResultTable.cardCount === NO_CARDS_SOLVED_COUNT
    )
      navigate(ROUTE_GAMEPAGE)
  }

  return (
    <NavBarContainer>
      <NavBarTitle>Mimir</NavBarTitle>
      <NewGameButton onClick={() => routePage()}>
        {getButtonText()}
      </NewGameButton>
      <ManageCardsButton onClick={() => navigate(ROUTE_CARDSOVERVIEWPAGE)}>
        {' '}
        Manage Cards{' '}
      </ManageCardsButton>
    </NavBarContainer>
  )
}

const NavBarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: #123456;
  box-shadow: 0 -2px 6px #17252a;
`

const NavBarTitle = styled.div`
  margin-left: 20px;
  font-size: 24px;
  font-weight: 500;
  color: #def2f1;
  width: 200px;
`
