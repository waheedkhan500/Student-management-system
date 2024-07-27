import React, { useState } from "react";
import {addDoc, collection } from "firebase/firestore";
import { database } from "../firebase";

function CreateStudent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault();
      // console.table([name , age])
      try {
        await addDoc(collection(database, "Students"), {
          name: name,
          age: Number(age)
          
        })
        setName("")
        setAge("")
      } catch (error) {
        console.log("Error in creating student", error)
        
      }
  };


  return (
    <div className="create-student-container">
      <form className="form" onSubmit={handleSubmit}>
        <input className="input-field "
          type="text"
          placeholder="enter student name here "
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input className="input-field"
          type="number"
          placeholder="enter student age here"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button className="create-btn" type="submit">Create Student</button>
      </form>
    </div>
  );
}

export default CreateStudent;
