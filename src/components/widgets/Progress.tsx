import { NewGameButton } from 'components/controls/Button'
import { TextInput } from 'components/controls/TextInput'
import { useContext, useEffect, useState } from 'react'
import { GameContext } from 'store/context'
import styled from 'styled-components/macro'
import { useNavigate } from 'react-router-dom'
import { ROUTE_APIGAME, ROUTE_GAMEPAGE } from 'App'
import { ColumnContainer, RowContainer } from './NewGame'

export const Progress = () => {
  const [inputAnswer, setAnswer] = useState('')
  const [textCard, setText] = useState('')
  const [progress, setProgress] = useState('0')
  let { localResultTable, cardsSolved, dispatch } = useContext(GameContext)
  let navigate = useNavigate()

  useEffect(() => {
    const onMount = async () => {
      const response = await fetch(ROUTE_APIGAME)
      if (response.ok) {
        const data = await response.json()
        localResultTable = data
        setProgress(
          Math.round(
            (localResultTable.solved.length * 100) / localResultTable.cardCount
          ).toString()
        )
        setText(localResultTable.front.toString())
        dispatch({ type: 'update-game', localResultTable })
      }
    }
    onMount()
  }, [])

  const submitGame = async () => {
    const response = await fetch(`${ROUTE_APIGAME}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        answer: `${inputAnswer}`,
      }),
    })
    const data = await response.json()
    localResultTable = data
    if (response.ok) {
      setText(localResultTable.front)
      setProgress(
        Math.round(
          (localResultTable.solved.length * 100) / localResultTable.cardCount
        ).toString()
      )
    }
    const cardsSolvedNew = cardsSolved + 1
    dispatch({ type: 'update-game', localResultTable })
    dispatch({ type: 'set-solvedCards', cardsSolvedNew })
    setAnswer('')
  }

  const deleteGame = async () => {
    const response = await fetch(`${ROUTE_APIGAME}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
    if (response.ok) {
      dispatch({ type: 'delete-game', localResultTable })
      const cardsSolvedNew = 0
      dispatch({ type: 'set-solvedCards', cardsSolvedNew })
      navigate(ROUTE_GAMEPAGE)
    }
  }

  return (
    <div>
      <ProgressColumnContainer>
        <TopRowContainer>
          <ProgressPercent>Progress {progress}%</ProgressPercent>
          <NewGameButton onClick={deleteGame}>Delete Game</NewGameButton>
        </TopRowContainer>
        <NameToTranslate>{textCard}</NameToTranslate>
        <ProgressRowContainer>
          <TextInput
            onChange={setAnswer}
            value={inputAnswer}
            placeholder="Answer"
          ></TextInput>
          <NewGameButton onClick={submitGame}>Submit</NewGameButton>
        </ProgressRowContainer>
      </ProgressColumnContainer>
    </div>
  )
}

const ProgressPercent = styled.div`
  font-size: 30px;
  font-weight: 500;
  color: steelblue;
`

const ProgressColumnContainer = styled.div`
  ${ColumnContainer};
  margin: 30px;
`

const TopRowContainer = styled.div`
  ${RowContainer};
  justify-content: space-between;
  width: fill-available;
`

const ProgressRowContainer = styled.div`
  ${RowContainer};
  justify-content: space-between;
  width: 400px;
`

const NameToTranslate = styled.div`
  border: 1px solid gray;
  border-radius: 8px;
  padding: 100px 175px;
  margin: 50px;
  font-size: 30px;
  font-weight: 750;
  color: steelblue;
`
