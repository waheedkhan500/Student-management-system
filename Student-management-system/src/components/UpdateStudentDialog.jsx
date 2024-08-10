import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

export default function UpdateStudentDialog({
  editDialogOpen,
  currentStudent,
    handleDialogClose,
    handleChange,
  handleSaveStudent
}) {
  return (
    <Dialog
      open={editDialogOpen}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Update Student</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Student Name"
          type="text"
          fullWidth
          value={currentStudent?.name || ""}
          onChange={handleChange}
        />

        <TextField
          margin="dense"
          name="age"
          label="Student Age"
          type="number"
          fullWidth
          value={currentStudent?.age || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="rollNo"
          label="Student Roll No"
          type="number"
          fullWidth
          value={currentStudent?.rollNo || ""}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancle</Button>
        <Button onClick={handleSaveStudent}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
