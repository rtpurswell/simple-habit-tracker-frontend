import React, { useCallback, useEffect, useState } from 'react'
import militaryToStandard from '../../../utils/militaryToStandard'
import _ from 'lodash'
import moment from 'moment-timezone'
import EditHabit from '../../../Habits/EditHabit'
import AddRecord from '../../AddRecord'
import standardToMilitary from '../../../utils/standardToMilitary'
function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent)
  const y = Math.sin(2 * Math.PI * percent)

  return { x, y }
}
//Multiplyer constants that control the total size of the circle and the size of the outside ring
const MULTIPLYER = 90
const SMALLMULTIPLYER = 75
function MapCircleSlide(props) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const { timemap, habits, includedRecords, selectedDay } = props

  const [mouseIsDown, setMouseIsDown] = useState(false)
  const [selectedTime, setSelectedTime] = useState('12am')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 })

  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const handleMouseUp = () => {
    setMouseIsDown(false)
  }
  const handleMouseDown = () => {
    setMouseIsDown(true)
  }
  useEffect(() => {
    document.body.addEventListener('mousedown', handleMouseDown)
    document.body.addEventListener('mouseup', handleMouseUp)
    const cleanUp = () => {
      document.body.removeEventListener('mousedown', handleMouseDown)
      document.body.removeEventListener('mouseup', handleMouseUp)
    }
    return cleanUp
  }, [])

  const handleMenuClose = () => {
    setMenuIsOpen(false)
  }
  const handleMenuOpen = () => {
    setMenuIsOpen(true)
  }
  const handleHabitDeleted = () => {
    setSelectedRecord(null)
  }
  const throttleTouchMove = _.throttle((event) => {
    //when touching the SVG it gets the Path that is currently under the touch
    //It extracts data fields out of the markup to change the state of the component
    //NOTE: Would like a better implementation that does not involve using data fields in the markup
    const myLocation = event.changedTouches[0]
    const realTarget = document.elementFromPoint(
      myLocation.clientX,
      myLocation.clientY,
    )
    if (realTarget.nodeName === 'path' && realTarget.dataset.selectx) {
      if (realTarget.dataset.recordid === 'none') {
        setSelectedRecord(null)
        setSelectedTime(realTarget.dataset.time)
      } else {
        setSelectedRecord(includedRecords[realTarget.dataset.recordid])
        setSelectedTime(
          moment(includedRecords[realTarget.dataset.recordid].completedAt)
            .tz(timeZone)
            .format('hh:mma'),
        )
      }
      setCirclePosition({
        x: realTarget.dataset.selectx * MULTIPLYER,
        y: realTarget.dataset.selecty * MULTIPLYER,
      })
    }
  }, 100)
  const handleTouchMove = useCallback(throttleTouchMove, [throttleTouchMove])
  const handleClick = (x, y, record, time) => () => {
    setCirclePosition({ x: x * MULTIPLYER, y: y * MULTIPLYER })
    setSelectedTime(time)
    setSelectedRecord(record)
  }
  const handleHover = (x, y, record, time) => () => {
    if (mouseIsDown) {
      setCirclePosition({ x: x * MULTIPLYER, y: y * MULTIPLYER })
      setSelectedTime(time)
      setSelectedRecord(record)
    }
  }
  if (habits.length === 0 && timemap.length > 0) {
    return null
  }
  const drawPie = () => {
    //Uses 24 length array to represent 24 hours in a day
    //Finds if there are any records for that hour and creates 2 Paths. 1 is a transparent pie shape for events and the other is the shape for the colors on the outside
    //Prints an empty pie and white space if there are no records within the hour
    const hourArray = []
    for (let i = 0; i < 24; i++) {
      hourArray.push(i)
    }
    let currentPercent = 0
    return (
      <g>
        {hourArray.map((i) => {
          const timeIndex = timemap.findIndex(
            (timeObject) => timeObject.id === i,
          )
          if (timeIndex !== -1) {
            const slicePercent = 4.1666 / timemap[timeIndex].records.length
            return (
              <g key={`circleSlideGroup${i}`}>
                {timemap[timeIndex].records.map((record) => {
                  const timeStartPosition = getCoordinatesForPercent(
                    currentPercent / 100,
                  )
                  currentPercent += slicePercent
                  const selectPosition = getCoordinatesForPercent(
                    (currentPercent - slicePercent / 2) / 100,
                  )
                  const timeEndPosition = getCoordinatesForPercent(
                    currentPercent / 100,
                  )
                  const habitIndex = habits.findIndex(
                    (habit) => habit._id === record._habitId,
                  )
                  const habit = habits[habitIndex]
                  return (
                    <g key={`circleSlidePath${record._id}`}>
                      <path
                        d={`M ${timeStartPosition.x * SMALLMULTIPLYER} ${
                          timeStartPosition.y * SMALLMULTIPLYER
                        } L ${timeStartPosition.x * MULTIPLYER} ${
                          timeStartPosition.y * MULTIPLYER
                        } A 100 100 0 0 1 ${timeEndPosition.x * MULTIPLYER} ${
                          timeEndPosition.y * MULTIPLYER
                        } L ${timeEndPosition.x * SMALLMULTIPLYER} ${
                          timeEndPosition.y * SMALLMULTIPLYER
                        }`}
                        fill={`rgb(${habit.color.r},${habit.color.g},${habit.color.b})`}
                      ></path>
                      <path
                        d={`M ${timeStartPosition.x * MULTIPLYER} ${
                          timeStartPosition.y * MULTIPLYER
                        } A 100 100 0 0 1 ${timeEndPosition.x * MULTIPLYER} ${
                          timeEndPosition.y * MULTIPLYER
                        } L 0 0`}
                        className="cursor-pointer"
                        onClick={handleClick(
                          selectPosition.x,
                          selectPosition.y,
                          record,
                          moment(record.completedAt)
                            .tz(timeZone)
                            .format('hh:mma'),
                        )}
                        onMouseEnter={handleHover(
                          selectPosition.x,
                          selectPosition.y,
                          record,
                          moment(record.completedAt)
                            .tz(timeZone)
                            .format('hh:mma'),
                        )}
                        data-selectx={selectPosition.x}
                        data-selecty={selectPosition.y}
                        data-recordid={record._id}
                        fill="rgba(0,0,0,0)"
                      ></path>
                    </g>
                  )
                })}
              </g>
            )
          } else {
            const timeStartPosition = getCoordinatesForPercent(
              currentPercent / 100,
            )
            currentPercent += 4.1666
            const timeEndPosition = getCoordinatesForPercent(
              currentPercent / 100,
            )
            const selectPosition = getCoordinatesForPercent(
              (currentPercent - 2.083) / 100,
            )
            return (
              <g key={`circleSlideGroup${i}`}>
                <path
                  className="cursor-pointer"
                  d={`M ${timeStartPosition.x * SMALLMULTIPLYER} ${
                    timeStartPosition.y * SMALLMULTIPLYER
                  } L ${timeStartPosition.x * MULTIPLYER} ${
                    timeStartPosition.y * MULTIPLYER
                  } A 100 100 0 0 1 ${timeEndPosition.x * MULTIPLYER} ${
                    timeEndPosition.y * MULTIPLYER
                  } L ${timeEndPosition.x * SMALLMULTIPLYER} ${
                    timeEndPosition.y * SMALLMULTIPLYER
                  } A 100 100 0 0 0 ${timeStartPosition.x * SMALLMULTIPLYER} ${
                    timeStartPosition.y * SMALLMULTIPLYER
                  }`}
                  fill="rgb(152,222,248)"
                ></path>
                <path
                  d={`M ${timeStartPosition.x * MULTIPLYER} ${
                    timeStartPosition.y * MULTIPLYER
                  } A 100 100 0 0 1 ${timeEndPosition.x * MULTIPLYER} ${
                    timeEndPosition.y * MULTIPLYER
                  } L 0 0`}
                  fill="rgba(0,0,0,0)"
                  className="cursor-pointer"
                  onClick={handleClick(
                    selectPosition.x,
                    selectPosition.y,
                    null,
                    militaryToStandard[i],
                  )}
                  onMouseEnter={handleHover(
                    selectPosition.x,
                    selectPosition.y,
                    null,
                    militaryToStandard[i],
                  )}
                  data-selectx={selectPosition.x}
                  data-selecty={selectPosition.y}
                  data-recordid="none"
                  data-time={militaryToStandard[i]}
                ></path>
              </g>
            )
          }
        })}
      </g>
    )
  }
  const getColorForRecord = (record, darker = false) => {
    if (!record) return darker ? 'rgb(112,182,208)' : 'rgb(152,222,248)'
    const habitIndex = habits.findIndex(
      (habit) => habit._id === record._habitId,
    )
    if (habitIndex !== -1) {
      let r, g, b
      if (darker) {
        r =
          habits[habitIndex].color.r - 40 > 0
            ? habits[habitIndex].color.r - 40
            : 0
        g =
          habits[habitIndex].color.g - 40 > 0
            ? habits[habitIndex].color.g - 40
            : 0
        b =
          habits[habitIndex].color.b - 40 > 0
            ? habits[habitIndex].color.b - 40
            : 0
      } else {
        r = habits[habitIndex].color.r
        g = habits[habitIndex].color.g
        b = habits[habitIndex].color.b
      }

      return `rgb(${r},${g},${b})`
    }
  }
  const getHabitForRecord = (record) => {
    const habitIndex = habits.findIndex(
      (habit) => habit._id === record._habitId,
    )
    if (habitIndex !== -1) return habits[habitIndex]
    return null
  }

  return (
    <React.Fragment>
      <div className="flex flex-col  relative">
        <div className="flex w-full flex-col">
          <svg
            //We adjust the viewbox to be centered and rotate by 90 deg so we can use sin and cos to calculate coordinates based on precent of the circle circumference
            className="w-full  -rotate-90 rounded-full"
            viewBox="-100 -100 200 200"
            style={{ touchAction: 'none' }}
            onTouchMove={handleTouchMove}
          >
            {drawPie()}

            <circle
              //this circle shows the user what is currently selected
              cx={circlePosition.x}
              cy={circlePosition.y}
              r="5"
              fill={
                selectedRecord
                  ? getColorForRecord(selectedRecord)
                  : 'rgb(152,222,248)'
              }
            ></circle>
            <circle
              cx="0"
              cy="0"
              r="40"
              fill={
                selectedRecord
                  ? getColorForRecord(selectedRecord, true)
                  : 'rgb(112,182,208)'
              }
              className="boxShadow"
            ></circle>
          </svg>
        </div>
        <div
          className="absolute  rounded-full flex flex-col justify-center items-center circleSlideMiddle "
          style={{
            height: '35%',
            width: '35%',
            backgroundColor: selectedRecord
              ? getColorForRecord(selectedRecord)
              : 'rgb(152,222,248)',
          }}
        >
          <div
            className="flex flex-col justify-center items-center  rounded-t-full py-3 cursor-pointer w-full"
            onClick={handleMenuOpen}
          >
            <div className="text-xl text-center z-20 overflow-hidden max-h-16 w-full">
              {selectedRecord
                ? getHabitForRecord(selectedRecord).name
                : 'Add Record At'}
            </div>
            <div className="z-20">{selectedTime}</div>
          </div>
        </div>
      </div>
      {selectedRecord ? (
        <EditHabit
          isOpen={menuIsOpen}
          _habitId={selectedRecord._habitId}
          handleClose={handleMenuClose}
          onDelete={handleHabitDeleted}
          defaultRecord={selectedRecord._id}
        />
      ) : (
        <AddRecord
          isOpen={menuIsOpen}
          handleClose={handleMenuClose}
          time={moment(
            `${selectedDay}-${standardToMilitary[selectedTime]}`,
            'YYYY-MM-DD-HH',
          ).format('YYYY-MM-DDTHH:00:00')}
        />
      )}
    </React.Fragment>
  )
}

export default MapCircleSlide
