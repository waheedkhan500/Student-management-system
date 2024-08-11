import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../firebase";
import { TextField } from "@mui/material";
// import { Height } from "@mui/icons-material";
import Button from "@mui/material/Button";

function CreateStudent({ getStudents }) {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isCreatingStudent, setIsCreatingStudent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table([name , age])
    try {
      setIsCreatingStudent(true);
      await addDoc(collection(database, "Students"), {
        rollNo: Number(rollNo),
        name: name,
        age: Number(age),
      });
      setRollNo("")
      setName("");
      setAge("");
      setIsCreatingStudent(false);

      await getStudents();
    } catch (error) {
      console.log("Error in creating student", error);
      setIsCreatingStudent(false);
    }
  };

  return (
    <div className="create-student-container">
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          className="input-field "
          sx={{ margin: "10px", width:"30%" }}
          type="text"
          label="Student Name "
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className="input-field "
          sx={{ margin: "10px", width:"25%" }}
          type="number"
          label="Roll No"
          required
          value={rollNo}
          onChange={(e) => {
            setRollNo(e.target.value);
          }}
        />
        <TextField
          className="input-field"
          sx={{ margin: "10px", width:"25%" }}
          type="number"
          label="Student Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{ margin: "10px", width: "6rem" }}
        >
          {isCreatingStudent ? "Adding..." : "Add"}
        </Button>
      </form>
    </div>
  );
}

export default CreateStudent;
