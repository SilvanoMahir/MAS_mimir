import { useNavigate, useParams } from 'react-router-dom'
import { CardUpdateButton } from 'components/controls/Button'
import styled from 'styled-components/macro'
import { TextInput } from 'components/controls/TextInput'
import { useContext, useEffect, useState } from 'react'
import { CardsContext } from 'store/context'
import { ROUTE_CARDSOVERVIEWPAGE, ROUTE_APICARDS } from 'App'

export default function CardDetailsPage() {
  const [changeFront, setChangeFront] = useState('')
  const [changeBack, setChangeBack] = useState('')
  const { id } = useParams()
  const { cardsListLocal } = useContext(CardsContext)
  let navigate = useNavigate()

  useEffect(() => {
    const onMount = async () => {
      let data = cardsListLocal.filter(cards => cards.id === id)
      const { front, back } = data[0]
      setChangeFront(front)
      setChangeBack(back)
    }
    onMount()
  }, [cardsListLocal, id])

  const updateCard = async () => {
    const response = await fetch(`${ROUTE_APICARDS}/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: id,
        front: changeFront,
        back: changeBack,
      }),
    })
    if (response.ok) {
      navigate(ROUTE_CARDSOVERVIEWPAGE)
    }
  }

  return (
    <EditCards>
      <EditSection>
        <CardTitle>Front</CardTitle>
        <TextInput
          onChange={setChangeFront}
          value={changeFront}
          placeholder="Front"
        ></TextInput>
      </EditSection>
      <EditSection>
        <CardTitle>Back</CardTitle>
        <TextInput
          onChange={setChangeBack}
          value={changeBack}
          placeholder="Back"
        ></TextInput>
      </EditSection>
      <CardUpdateButton onClick={() => updateCard()}>Update</CardUpdateButton>
    </EditCards>
  )
}

const EditCards = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
`

const CardTitle = styled.div`
  margin-left: 15px;
  font-weight: 500;
  font-size: 25px;
`
const EditSection = styled.div`
  display: flex;
  flex-direction: column;
`
