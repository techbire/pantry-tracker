import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function PantryForm() {
  const [item, setItem] = useState({ name: '', category: '', expirationDate: '', batchNumber: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'pantry'), item);
    setItem({ name: '', category: '', expirationDate: '', batchNumber: '' });
  };

  const handleUpdate = async (id) => {
    const itemDoc = doc(db, 'pantry', id);
    await updateDoc(itemDoc, item);
  };

  const handleDelete = async (id) => {
    const itemDoc = doc(db, 'pantry', id);
    await deleteDoc(itemDoc);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add form fields for name, category, expirationDate, and batchNumber */}
      {/* Add buttons for Add, Update, and Delete */}
    </form>
  );
}
