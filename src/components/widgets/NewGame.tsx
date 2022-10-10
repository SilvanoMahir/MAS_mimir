import { ROUTE_APIGAME } from 'App'
import { NewGameButton } from 'components/controls/Button'
import { useContext } from 'react'
import { GameContext } from 'store/context'
import styled, { css } from 'styled-components/macro'

export const NewGame = () => {
  let { localResultTable, cardsSolved, dispatch } = useContext(GameContext)

  const initNewGame = async () => {
    await fetch(`${ROUTE_APIGAME}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
    const response = await fetch(`${ROUTE_APIGAME}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    })
    if (response.ok) {
      const data = await response.json()
      localResultTable = data
      dispatch({ type: 'update-game', localResultTable })
      const cardsSolvedNew = cardsSolved + 1
      dispatch({ type: 'set-solvedCards', cardsSolvedNew })
    }
  }

  return (
    <InitContainer>
      <NewGameButton onClick={initNewGame}>Start New Game</NewGameButton>
      <NoGameRunning>No game running.</NoGameRunning>
    </InitContainer>
  )
}

const NoGameRunning = styled.div`
  margin-top: 50px;
  font-size: 25px;
  font-weight: 500;
`

const InitContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const RowContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const ColumnContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`
