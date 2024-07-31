import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "shoppingList"));
      const itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemsArray);
    };

    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (newItem) {
      try {
        await addDoc(collection(db, "shoppingList"), {
          item: newItem,
        });
        setNewItem("");
        const querySnapshot = await getDocs(collection(db, "shoppingList"));
        const itemsArray = [];
        querySnapshot.forEach((doc) => {
          itemsArray.push({ id: doc.id, ...doc.data() });
        });
        setItems(itemsArray);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <div>
      <h2>Shopping List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.item}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={handleAddItem}>Add</button>
    </div>
  );
};

export default ShoppingList;
