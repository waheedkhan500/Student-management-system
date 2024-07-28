import { collection,  getDocs } from 'firebase/firestore';

import { useEffect, useState } from 'react'
import { database } from '../firebase';

function StudentList() {

    const [students, setStudents] = useState([]);

    const studentsCollection  = collection(database,"Students")

    const getStudents = async () => {
        const studentsSnapshot =  await getDocs(studentsCollection)
        const studentsList = studentsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        
        console.log(studentsList);
        setStudents(studentsList)
    }
    useEffect(() => {
        
        getStudents();
    },[])
   
  return (
    <div>
      <h1>Student List</h1>
    </div>
  )
}

export default StudentList
