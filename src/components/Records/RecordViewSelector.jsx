import { useState } from 'react'
import Title from '../common/Title'
import CircleSlider from './Daily/CircleSlider'
import SimpleDay from './Daily/SimpleDay'
import CollapseIcon from '../common/Icons/CollapseIcon'
import ExpandIcon from '../common/Icons/ExpandIcon'
function RecordViewSelector() {
  const views = [<CircleSlider />, <SimpleDay />]
  const [viewIndex, setViewIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(true)
  const handleViewChange = () => {
    let newIndex = viewIndex + 1
    if (newIndex > views.length - 1) newIndex = 0
    setViewIndex(newIndex)
  }
  const handleOpenToggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="flex flex-col p-1">
      <div className="flex w-full ">
        <div className="flex">
          <Title>My Records</Title>
        </div>

        <div className="flex ml-auto items-center">
          <button
            onClick={handleViewChange}
            className="font-bold text-center w-full h-fit rounded mx-1 text-slate-50 bg-gray-700 p-1"
          >
            Cycle View
          </button>
        </div>
        <div className="flex items-center ml-3">
          <button onClick={handleOpenToggle}>
            {isOpen ? (
              <CollapseIcon
                color={{ r: 248, g: 250, b: 252 }}
                className="w-8 h-8"
              />
            ) : (
              <ExpandIcon
                color={{ r: 248, g: 250, b: 252 }}
                className="w-8 h-8"
              />
            )}
          </button>
        </div>
      </div>
      {isOpen ? views[viewIndex] : null}
    </div>
  )
}

export default RecordViewSelector
