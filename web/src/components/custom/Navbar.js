import React from 'react'
import { Link, routes } from '@redwoodjs/router'
import { useAppContext, AppContext } from 'src/context/AppContext'

export const Navbar = () => {
  const { username } = useAppContext(AppContext)
  return (
    <div className="pt-12">
      <nav className="fixed top-0 py-2 px-6 flex justify-between">
        <div className="flex items-center justify-between w-full">
          <Link to={routes.home()}>
            <span className="text-2xl ">askaway</span>
          </Link>
          <span className="font-semibold">{username}</span>
        </div>
      </nav>
    </div>
  )
}
