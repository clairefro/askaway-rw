import React from 'react'
import { Link, routes } from '@redwoodjs/router'

export const Navbar = () => {
  return (
    <div className="pt-12">
      <nav className="fixed top-0 py-2 px-6 w-full flex justify-between">
        <div className="flex items-center">
          <Link to={routes.home()}>
            <span className="text-2xl ">askaway</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
