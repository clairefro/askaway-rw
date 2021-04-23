import { Link, routes } from '@redwoodjs/router'

const RoomsLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.rooms()} className="rw-link">
            Rooms
          </Link>
        </h1>
        <Link to={routes.home()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Room
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default RoomsLayout
