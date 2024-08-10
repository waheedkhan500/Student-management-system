import React, { useEffect, useState } from 'react'

import CreateStudent from './components/CreateStudent'
import StudentList from './components/StudentList'
import { collection, getDocs } from 'firebase/firestore';
import { database } from './firebase';


function App() {

      const [students, setStudents] = useState([]);

      const studentsCollection = collection(database, "Students");

      const getStudents = async () => {
        const studentsSnapshot = await getDocs(studentsCollection);
        const studentsList = studentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // console.log(studentsList);
        console.table(studentsList);
        setStudents(studentsList);
      };
      // getStudents();
      useEffect(() => {
        getStudents();
      }, []);
  
  
  
  
  return (
    <div className='root-container'>
      <h1>Student Management System</h1>
      <CreateStudent getStudents={ getStudents} />
      <StudentList students={ students} setStudents={setStudents}></StudentList>
    </div>
  )
}

export default App
