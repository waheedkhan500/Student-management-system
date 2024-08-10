import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import "./StudentTable.css";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";
import UpdateStudentDialog from "./UpdateStudentDialog";
import { useState } from "react";


export default function StudentTable({ students, setStudents }) {

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(null)

  // Handle update student

  function handleUpdateStudent(studentId) {
    
    const student = students.find(s=>s.id === studentId)
    setCurrentStudent(student)
    setEditDialogOpen(true)
  }

  async function handleSaveStudent() {
    const studentDoc = doc(database, "Students", currentStudent.id)
    await updateDoc(studentDoc, {
      name: currentStudent.name,
      age: currentStudent.age,
      rollNo: currentStudent.rollNo
    })
    setStudents(students.map((student)=> student.id === currentStudent.id ? currentStudent:student))
    handleDialogClose()
  }

  // Handle Delete Student
  async function handleDeleteSTudent(studentId) {
    const studentDocument = doc(database, "Students", studentId);
    await deleteDoc(studentDocument);
    setStudents(students.filter((student)=>student.id!=studentId))
  }

  // Handle dialog close
  function handleDialogClose() {
    setEditDialogOpen(false)
    currentStudent(null)
  }

  // Handle Change
  function handleChange(event) {
    const {name, value} = event.target
    setCurrentStudent((prev) => ({
      ...prev,
      [name]:value
    }))
    

  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Student Roll No</TableCell>
              <TableCell align="center">Student Name</TableCell>
              <TableCell align="center">Student Age</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {student.rollNo}
                </TableCell>
                <TableCell align="center">{student.name}</TableCell>
                <TableCell align="center">{student.age}</TableCell>
                <TableCell align="center">
                  <EditIcon
                    className="icon edit-icon"
                    onClick={() => handleUpdateStudent(student.id)}
                  ></EditIcon>
                  <DeleteIcon
                    className="icon delete-icon"
                    onClick={() => handleDeleteSTudent(student.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateStudentDialog
        editDialogOpen={editDialogOpen}
        currentStudent={currentStudent}
        handleDialogClose={handleDialogClose}
        handleChange={handleChange}
        handleSaveStudent={handleSaveStudent}
      ></UpdateStudentDialog>
    </>
  );
}
