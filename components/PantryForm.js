import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const PantryForm = () => {
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "pantryItems"), {
        item,
        category,
        expirationDate,
      });
      setItem("");
      setCategory("");
      setExpirationDate("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item:
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <label>
        Expiration Date:
        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </label>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default PantryForm;
