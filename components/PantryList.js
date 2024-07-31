import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

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

  return (
    <div>
      <h2>Pantry List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.item} - {item.category} - {item.expirationDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PantryList;
