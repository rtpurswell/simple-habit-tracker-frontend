import { Link } from 'react-router-dom'
import { logUserOut } from '../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedIn } from '../../store/auth'
import Button from '../common/Button'
import SlidePage from '../common/SlidePage'

function MobileMenu(props) {
  const loggedIn = useSelector(getLoggedIn)
  const dispatch = useDispatch()

  return (
    <SlidePage in={props.menuOpen} direction="inLeft" isMain={true}>
      <div className="pr-6 pl-3">
        <div className="flex p-1 items-center h-20">
          <h2 className="w-4/5 text-xl p-4">Navigation</h2>
          <div className="w-1/5 flex justify-end ">
            <div
              className="h-12 w-12 rounded border-gray-900 border-2 flex justify-center pt-1 hover:bg-zinc-400 text-4xl cursor-pointer"
              onClick={props.handleMenuToggle}
            >
              X
            </div>
          </div>
        </div>
        <hr />
        <div className=" flex flex-col ">
          <Link
            to="/"
            className="p-3 w-full hover:bg-gray-500"
            onClick={props.handleMenuToggle}
          >
            Home
          </Link>
          <Link
            to="/forgotPassword"
            className="p-3 w-full hover:bg-gray-500"
            onClick={props.handleMenuToggle}
          >
            Forgot
          </Link>

          {loggedIn && (
            <Button
              color="cancel"
              onClick={() => {
                props.handleMenuToggle()
                dispatch(logUserOut())
              }}
            >
              Log Out
            </Button>
          )}
        </div>
      </div>
    </SlidePage>
  )
}

export default MobileMenu
