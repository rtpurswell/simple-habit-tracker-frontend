import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import _debounce from 'lodash/debounce'

function SlidePage(props) {
  const nodeRef = useRef(null)
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  const mainStyle = {
    width: dimensions.width,
    height: dimensions.height,
  }

  let classNames = 'slidePageBottom'
  if (props.direction === 'inLeft') classNames = 'slidePageLeft'
  useEffect(() => {
    if (props.in) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [props.in])
  useEffect(() => {
    const handleResize = _debounce(() => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }, 1000)

    window.addEventListener('resize', handleResize)

    return (_) => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <CSSTransition
      in={props.in}
      timeout={500}
      classNames={classNames}
      mountOnEnter={true}
      unmountOnExit={true}
      nodeRef={nodeRef}
    >
      <div
        className={`flex flex-col fixed top-0 left-0 bg-gray-800 overflow-y-scroll ${
          props.isMain ? 'z-50' : ''
        }`}
        style={mainStyle}
        ref={nodeRef}
      >
        {props.children}
      </div>
    </CSSTransition>
  )
}

export default SlidePage
