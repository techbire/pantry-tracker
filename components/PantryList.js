import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

export default function PantryList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'pantry'), orderBy('expirationDate'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{item.expirationDate}</p>
          <p>{item.batchNumber}</p>
        </div>
      ))}
    </div>
  );
}
