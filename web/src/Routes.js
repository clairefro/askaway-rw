// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import { GlobalLayout } from './layouts/GlobalLayout'

const Routes = ({ username }) => {
  return (
    <Router>
      <Set wrap={GlobalLayout} username={username}>
        <Route path="/rooms/{roomId}/questions/{id}/edit" page={EditQuestionPage} name="editQuestion" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/rooms/{id}/edit" page={EditRoomPage} name="editRoom" />
        <Route path="/rooms/{id}" page={RoomPage} name="room" />
        <Route path="/rooms" page={RoomsPage} name="rooms" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
