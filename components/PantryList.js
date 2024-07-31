import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { List, ListItem, ListItemText, TextField } from '@mui/material';

const PantryList = ({ setItem, setEditing }) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const q = query(collection(db, "pantry"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArray);
    });
    return () => unsubscribe();
  }, []);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <List>
        {filteredItems.map(item => (
          <ListItem
            key={item.id}
            button
            onClick={() => {
              setItem(item);
              setEditing(true);
            }}
          >
            <ListItemText primary={item.name} secondary={item.quantity} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PantryList;
