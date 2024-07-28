import { collection,  getDocs } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react'
import { database } from '../firebase';

function StudentList() {

    const [students, setStudents] = useState([]);

    const studentsCollection  = collection(database,"Students")

    const getStudents = async () => {
        const studentsSnapshot =  await getDocs(studentsCollection)
        const studensList = studentsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        console.log(studensList)
    }
    getStudents()
  return (
    <div>
      <h1>Student List</h1>
    </div>
  )
}

export default StudentList
