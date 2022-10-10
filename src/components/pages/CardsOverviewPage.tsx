import { Outlet, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { AddButton, CardSettingsButton } from 'components/controls/Button'
import { TextInput } from 'components/controls/TextInput'
import { ROUTE_APICARDS, ROUTE_CARDSOVERVIEWPAGE } from 'App'
import { CardsContext } from 'store/context'
import { ColumnContainer, RowContainer } from 'components/widgets/NewGame'

export default function CardsOverviewPage() {
  const [inputFront, setInputFront] = useState('')
  const [inputBack, setInputBack] = useState('')
  const { cardsListLocal, dispatch } = useContext(CardsContext)
  let navigate = useNavigate()

  useEffect(() => {
    const onMount = async () => {
      const cardsListLocal = await fetchCards()
      dispatch({ type: 'get-cards', cardsListLocal })
    }
    onMount()
  }, [dispatch])

  const addCard = async () => {
    const response = await fetch(ROUTE_APICARDS, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: '',
        front: inputFront,
        back: inputBack,
      }),
    })
    const { id } = await response.json()
    const newCard = {
      id: id,
      front: inputFront,
      back: inputBack,
    }
    if (response.ok) {
      dispatch({ type: 'add-cards', cardsListLocal, newCard })
      setInputFront('')
      setInputBack('')
    }
  }

  const fetchCards = async () => {
    const response = await fetch(ROUTE_APICARDS)
    if (response.ok) {
      return await response.json()
    }
    return []
  }

  const deleteCard = async (cardId: string) => {
    const response = await fetch(`${ROUTE_APICARDS}/${cardId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
    if (response.ok) {
      dispatch({ type: 'delete-cards', cardsListLocal, cardId })
    }
  }

  return (
    <OverviewColumnContainer>
      <OverviewRowContainer>
        <TextInput
          onChange={setInputFront}
          value={inputFront}
          placeholder="Front"
        ></TextInput>
        <TextInput
          onChange={setInputBack}
          value={inputBack}
          placeholder="Back"
        ></TextInput>
        <AddButton onClick={addCard}>Add</AddButton>
      </OverviewRowContainer>
      {cardsListLocal?.map(card => (
        <OverviewRowContainer key={card.id}>
          <CardText>{card.front}</CardText>
          <CardText>{card.back}</CardText>
          <CardSettingsButton
            onClick={() => {
              navigate(`${ROUTE_CARDSOVERVIEWPAGE}/${card.id}`)
            }}
          >
            Edit
          </CardSettingsButton>
          <CardSettingsButton onClick={() => deleteCard(card.id)}>
            Delete
          </CardSettingsButton>
        </OverviewRowContainer>
      ))}
      <Outlet />
    </OverviewColumnContainer>
  )
}

const CardText = styled.div`
  flex: display;
  margin: 10px;
  width: 300px;
  font-size: 25px;
`

const OverviewColumnContainer = styled.div`
  ${ColumnContainer};
  margin: 10px;
`

const OverviewRowContainer = styled.div`
  ${RowContainer};
  flex-direction: row;
  margin: 10px;
`
