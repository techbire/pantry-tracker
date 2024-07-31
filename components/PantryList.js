import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const PantryList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "pantryItems"));
      const itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemsArray);
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "pantryItems", id));
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, "pantryItems", id), updatedData);
      setItems(items.map(item => item.id === id ? { ...item, ...updatedData } : item));
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <h2>Pantry List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.item} - {item.category} - {item.expirationDate} - Quantity: {item.quantity}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <button onClick={() => handleUpdate(item.id, { quantity: item.quantity + 1 })}>Increase Quantity</button>
            <button onClick={() => handleUpdate(item.id, { quantity: item.quantity - 1 })}>Decrease Quantity</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PantryList;
