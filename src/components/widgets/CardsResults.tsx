import { ROUTE_APIGAME, ROUTE_GAMEPAGE } from 'App'
import { NewGameButton } from 'components/controls/Button'
import { GameCardParams } from 'models/GameCardParams'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameContext } from 'store/context'
import { ColumnContainer } from './NewGame'

export const CardsResults = () => {
  const [finalResultTable, setTable] = useState<GameCardParams[]>([])
  let { localResultTable, dispatch } = useContext(GameContext)
  let navigate = useNavigate()

  useEffect(() => {
    const onMount = async () => {
      const response = await fetch(ROUTE_APIGAME)
      if (response.ok) {
        const { solved } = await response.json()
        setTable(solved)
      }
    }
    onMount()
  }, [])

  const evaluateResponse = () => {
    return finalResultTable.filter(card => card.accepted).length
  }

  const startGame = async () => {
    await deleteGame()
    await startNewGame()
    navigate(ROUTE_GAMEPAGE)
  }

  const deleteGame = async () => {
    const response = await fetch(`${ROUTE_APIGAME}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
    if (response.ok) {
      dispatch({ type: 'delete-game', localResultTable })
      const cardsSolvedNew = 1
      dispatch({ type: 'set-solvedCards', cardsSolvedNew })
    }
  }

  const startNewGame = async () => {
    const response = await fetch(`${ROUTE_APIGAME}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    })
    if (response.ok) {
      const data = await response.json()
      localResultTable = data
      dispatch({ type: 'update-game', localResultTable })
      const cardsSolvedNew = 1
      dispatch({ type: 'set-solvedCards', cardsSolvedNew })
    }
  }

  return (
    <ResultsColumnContainer>
      <NewGameButton onClick={startGame}>Start New Game</NewGameButton>
      <ResultText>
        Solved {evaluateResponse()} out of {finalResultTable.length} correctly.
      </ResultText>
      <ResultRow>
        <CardResultTitles>Front</CardResultTitles>
        <CardResultTitles>Back</CardResultTitles>
        <CardResultTitles>Your Answer</CardResultTitles>
        <CardResultTitles>Accepted</CardResultTitles>
      </ResultRow>
      {finalResultTable?.map(card => (
        <ResultRow key={card.id}>
          <Result>{card.front}</Result>
          <Result>{card.back}</Result>
          <Result>{card.answer}</Result>
          {card.accepted ? <Result>✔</Result> : <Result>✘</Result>}
        </ResultRow>
      ))}
    </ResultsColumnContainer>
  )
}

const ResultText = styled.div`
  display: flex;
  font-weight: 500;
  margin: 20px;
  font-size: 20px;
`

const Result = styled.div`
  display: flex;
  flex; 1; 
  margin: 10px;
  width: 800px;
  font-size: 20px;
`

const ResultRow = styled.div`
  display: flex;
  flex; 1; 
  width: 800px;
`

const CardResultTitles = styled.div`
  flex: display;
  flex: 1;
  margin: 10px;
  font-size: 25px;
  font-weight: 500;
`

const ResultsColumnContainer = styled.div`
  ${ColumnContainer};
  margin: 30px;
`
