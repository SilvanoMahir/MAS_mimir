import styled, { css } from 'styled-components/macro'

interface Props {
  onClick: () => void
  children: string
}

export const Button = ({ onClick, children }: Props) => {
  return <button onClick={onClick}>{children}</button>
}

export const CustomButton = css`
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #def2f1;
  font-size: 25px;
  font-weight: 500;
  padding: 4px 8px;
`

export const NewGameButton = styled.button`
  ${CustomButton};
  background: steelblue;
`

export const CardSettingsButton = styled.button`
  ${CustomButton};
  background: steelblue;
  align-items: baseline;
  margin: 5px;
  font-size: 25px;
`
export const AddButton = styled.button`
  ${CustomButton};
  background: steelblue;
  align-items: baseline;
  margin: 5px;
  width: 200px;
`

export const CardUpdateButton = styled.button`
  ${CustomButton};
  background: steelblue;
`

export const ManageCardsButton = styled.button`
  ${CustomButton};
  margin-right: 20px;
  background: #123456;
  width: 200px;
`
