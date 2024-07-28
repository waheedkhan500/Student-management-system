import React from 'react'

import CreateStudent from './components/CreateStudent'
import StudentList from './components/StudentList'

function App() {
  return (
    <div className='root-container'>
      <h1>Student Management System</h1>
      <CreateStudent />
      <StudentList></StudentList>
    </div>
  )
}

export default App
