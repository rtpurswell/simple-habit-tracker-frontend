import moment from 'moment-timezone'
import React from 'react'

function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent)
  const y = Math.sin(2 * Math.PI * percent)

  return { x, y }
}

function MapClock(props) {
  const { clock, habits, className } = props
  let cumulitivePercent = 0
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const mapHour = (clockKey) => {
    if (clock[clockKey].length === 0) {
      cumulitivePercent += 8.333
    } else {
      const habitPercent = 8.333 / clock[clockKey].length

      return (
        <g>
          {clock[clockKey].map((record) => {
            let timeStartPosition = getCoordinatesForPercent(
              cumulitivePercent / 100,
            )
            cumulitivePercent += habitPercent
            let timeEndPostion = getCoordinatesForPercent(
              cumulitivePercent / 100,
            )
            const habitIndex = habits.findIndex(
              (habit) => habit._id === record._habitId,
            )

            const { r, g, b } = habits[habitIndex].color
            return (
              <path
                d={`M ${timeStartPosition.x * 83} ${
                  timeStartPosition.y * 83
                } A 100 100 0 0 1 ${timeEndPostion.x * 83} ${
                  timeEndPostion.y * 83
                } L 0 0`}
                fill={`rgb(${r},${g},${b})`}
                className="cursor-pointer"
              >
                <title>
                  {record._habitId}
                  {moment(record.completedAt).tz(timeZone).format('LLL')}
                </title>
              </path>
            )
          })}
        </g>
      )
    }
  }
  const clockLineCoords = []
  let currentPercent = 0
  for (let i = 0; i < 12; i++) {
    const lineCoord = getCoordinatesForPercent(currentPercent / 100)
    clockLineCoords.push({ x: lineCoord.x, y: lineCoord.y })
    currentPercent += 8.33
  }
  return (
    <svg
      viewBox="-100 -100 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`-rotate-90 ${className}`}
    >
      <circle
        cx="0"
        cy="0"
        r="90"
        className="stroke-purple-200"
        style={{ strokeWidth: '15px' }}
        fill="white"
      ></circle>
      {Object.keys(clock).map((clockKey) => (
        <g>
          {mapHour(clockKey)} <title>{clockKey}</title>
        </g>
      ))}
      {clockLineCoords.map((coords) => (
        <React.Fragment>
          <line
            x1={0}
            x2={coords.x * 83}
            y1={0}
            y2={coords.y * 83}
            stroke="black"
            style={{ strokeWidth: '3px' }}
          ></line>
          <text
            x={Math.sign(coords.x) === -1 ? coords.x * 90 : coords.x * 90}
            y={coords.y * 90}
            className="rotate-90 text-sm"
          >
            2
          </text>
        </React.Fragment>
      ))}
      {/* <text x="-8" y="-91" className="text-xs rotate-90 font-bold">
        12
      </text>
      <text x="43" y="-79" className="text-xs rotate-90 font-bold">
        1
      </text>
      <text x="79" y="-43" className="text-xs rotate-90 font-bold">
        2
      </text>
      <text x="91" y="4" className="text-xs rotate-90 font-bold">
        3
      </text>
      <text x="79" y="53" className="text-xs rotate-90 font-bold">
        4
      </text>
      <text x="44" y="87" className="text-xs rotate-90 font-bold">
        5
      </text>
      <text x="-4" y="100" className="text-xs rotate-90 font-bold">
        6
      </text>
      <text x="-49" y="88" className="text-xs rotate-90 font-bold">
        7
      </text>
      <text x="-84" y="53" className="text-xs rotate-90 font-bold">
        8
      </text>
      <text x="-98" y="4" className="text-xs rotate-90 font-bold">
        9
      </text>
      <text x="-89" y="-43" className="text-xs rotate-90 font-bold">
        10
      </text>
      <text x="-53" y="-78" className="text-xs rotate-90 font-bold">
        11
      </text> */}
    </svg>
  )
}

export default MapClock
