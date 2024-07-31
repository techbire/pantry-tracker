import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";

const PantryList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "pantryItems"), (snapshot) => {
      const itemsArray = [];
      snapshot.forEach((doc) => {
        itemsArray.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemsArray);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "pantryItems", id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, "pantryItems", id), updatedData);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Function to format date as dd-mm-yyyy
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <h2>Pantry List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.item} - {item.category} - Expiration Date: {formatDate(item.expirationDate)} - Quantity: {item.quantity}
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
