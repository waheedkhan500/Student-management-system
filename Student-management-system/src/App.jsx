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
        // console.table(studentsList);
        setStudents(studentsList);
      };
      // getStudents();
      useEffect(() => {
        getStudents();
      }, []);
  
  
  
  
  return (
    <>
      
      <h1>Student Management System</h1>
      <div className="root-container">
        <div className="createStudent-container">
          <CreateStudent getStudents={getStudents} />
        </div>
        <div className="studentList-container">
          <StudentList
            students={students}
            setStudents={setStudents}
          ></StudentList>
        </div>
      </div>
    </>
  );
}

export default App
