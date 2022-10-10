import styled from 'styled-components/macro'

interface Props {
  onChange: (value: string) => void
  value: string
  placeholder?: string
}

export const TextInput = ({ onChange, value, placeholder }: Props) => (
  <CustomTextInput
    type="text"
    onChange={e => onChange(e.target.value)}
    value={value}
    placeholder={placeholder}
  />
)

const CustomTextInput = styled.input`
  border: none;
  border-bottom: 2px solid steelblue;
  width: 300px;
  font-size: 25px;
  color: steelblue;
  display: flex;
  flex-direction: column;
  margin: 10px;
`
