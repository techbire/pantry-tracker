import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const PantryForm = () => {
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "pantryItems"), {
        item,
        category,
        expirationDate,
        quantity,
      });
      setItem("");
      setCategory("");
      setExpirationDate("");
      setQuantity(1);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pantry-form">
      <label>
        Item Name:
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </label>
      <label>
        Expiration Date:
        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />
      </label>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default PantryForm;
