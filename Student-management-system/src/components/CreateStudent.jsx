import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../firebase";

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
        <input
          className="input-field "
          type="text"
          placeholder="Enter Student Name Here "
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-field "
          type="number"
          placeholder="Enter Roll No Here"
          required
          value={rollNo}
          onChange={(e) => {
            setRollNo(e.target.value);
          }}
        />
        <input
          className="input-field"
          type="number"
          placeholder="Enter Student Age Here"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button className="create-btn" type="submit">
          {isCreatingStudent ? "Creating..." : "Create Student"}
        </button>
      </form>
    </div>
  );
}

export default CreateStudent;
