import { useState } from 'react'

import MobileMenu from './MobileMenu'
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className=" bg-gray-600  p-1 flex items-center max-h-20 ">
      <div className="flex w-2/3 items-center max-h-20 min-h-20">
        <div className="w-3/8">
          <img
            src="/logo.png"
            className="max-h-20 "
            style={{ minWidth: '80px' }}
            alt="Logo"
          />
        </div>
        <div className="flex-grow h-fit font-bold text-orange-400">
          Habit Tracker
        </div>
      </div>
      <div className="flex-grow flex justify-end">
        <div
          className="h-12 w-12 rounded border-gray-900 border-2 flex flex-col  items-center pt-1 hover:bg-zinc-400 cursor-pointer"
          onClick={!menuOpen ? handleMenuToggle : undefined}
        >
          <div className="h-2 w-10 bg-gray-900 my-0.5 rounded"></div>
          <div className="h-2 w-10 bg-gray-900 my-0.5 rounded"></div>
          <div className="h-2 w-10 bg-gray-900 my-0.5 rounded"></div>
        </div>
      </div>
      <MobileMenu handleMenuToggle={handleMenuToggle} menuOpen={menuOpen} />
    </nav>
  )
}

export default Navbar
