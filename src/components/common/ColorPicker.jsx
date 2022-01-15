import { useState } from 'react'
import Title from './Title'
import { SliderPicker, CirclePicker } from 'react-color'
import SmallButton from './SmallButton'

function ColorPicker(props) {
  const { onChange, color } = props
  const [pickerIndex, setPickerIndex] = useState(0)
  const pickers = [
    <div className="flex justify-center">
      <CirclePicker color={color} onChange={onChange} />
    </div>,
    <SliderPicker color={color} onChange={onChange} />,
  ]
  const handleCycle = () => {
    let newIndex = pickerIndex + 1
    if (newIndex > pickers.length - 1) newIndex = 0
    setPickerIndex(newIndex)
  }
  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center">
        <Title>Color</Title>
        <div>
          <SmallButton color="dark" onClick={handleCycle}>
            Cycle Color Picker
          </SmallButton>
        </div>
      </div>
      <div>{pickers[pickerIndex]}</div>
    </div>
  )
}

export default ColorPicker
