import Button from '../common/Button'
import SlidePage from '../common/SlidePage'
import { useAuth0 } from '@auth0/auth0-react'
function MobileMenu(props) {
  const { isAuthenticated, logout } = useAuth0()

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
          {isAuthenticated && (
            <Button
              color="cancel"
              onClick={() => logout({ returnTo: window.location.origin })}
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
