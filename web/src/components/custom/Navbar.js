import React from 'react'
import { Link, routes } from '@redwoodjs/router'

export const Navbar = () => {
  return (
    <nav className="py-2 px-6 w-full flex justify-between">
      <div className="flex items-center">
        <Link to={routes.home()}>
          <span className="x-logo-text text-4xl ">askaway</span>
        </Link>
      </div>
    </nav>
  )
}
