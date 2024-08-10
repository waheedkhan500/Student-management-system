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
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../firebase";


export default function StudentTable({ students, setStudents }) {
  // Handle update student

  function handleUpdateStudent(studentId) {
    alert(studentId);
  }

  // Handle Delete Student
  async function handleDeleteSTudent(studentId) {
    const studentDocument = doc(database, "Students", studentId);
    await deleteDoc(studentDocument);
    setStudents(students.filter((student)=>student.id!=studentId))
  }

  return (
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
              key={students.id}
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
  );
}
