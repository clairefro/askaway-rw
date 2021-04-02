// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/questions/new" page={NewQuestionPage} name="newQuestion" />
      <Route path="/questions/{id}/edit" page={EditQuestionPage} name="editQuestion" />
      <Route path="/questions/{id}" page={QuestionPage} name="question" />
      <Route path="/questions" page={QuestionsPage} name="questions" />
      <Route path="/" page={NewRoomPage} name="home" />
      <Route path="/rooms/{id}/edit" page={EditRoomPage} name="editRoom" />
      <Route path="/rooms/{id}" page={RoomPage} name="room" />
      <Route path="/rooms" page={RoomsPage} name="rooms" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
