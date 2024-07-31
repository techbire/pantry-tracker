import { useState } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { TextField, Button } from '@mui/material';

const PantryForm = ({ item, setItem, editing, setEditing }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateDoc(doc(db, "pantry", item.id), item);
    } else {
      await addDoc(collection(db, "pantry"), item);
    }
    setItem({ name: '', quantity: '' });
    setEditing(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "pantry", id));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        required
      />
      <TextField
        label="Quantity"
        value={item.quantity}
        onChange={(e) => setItem({ ...item, quantity: e.target.value })}
        required
      />
      <Button type="submit">{editing ? "Update" : "Add"}</Button>
      {editing && <Button onClick={() => handleDelete(item.id)}>Delete</Button>}
    </form>
  );
};

export default PantryForm;
